<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\BookingConsumption;
use App\Models\MeetingRoom;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookingController extends Controller
{
  public function index(Request $request)
  {
    $bookings = Booking::with(['meetingRoom', 'unit'])->latest()->get();

    return Inertia::render('booking/index', [
      'bookings' => $bookings,
      'message' => $request->session()->get('message')
    ]);
  }

  public function create(Request $request)
  {
    $units = Unit::with('meetingRooms:id,unit_id,name,capacity')
      ->get()
      ->map(fn($unit) => [
        'value' => $unit->id,
        'label' => $unit->name,
        'meeting_rooms' => $unit->meetingRooms->map(fn($room) => [
          'value' => $room->id,
          'label' => $room->name,
          'capacity' => $room->capacity,
        ]),
      ]);

    return Inertia::render('booking/create', [
      'units' => $units,
      'message' => $request->session()->get('message')
    ]);
  }

  public function store(StoreBookingRequest $request)
  {
    DB::beginTransaction();

    try {
      $data = $request->validated();

      $room = MeetingRoom::findOrFail($data['meeting_room_id']);

      if ($data['participants'] > $room->capacity) {
        return back()->with(
          'message',
          'Jumlah peserta tidak boleh lebih besar dari kapasitas ruangan'
        );
      }

      $booking = Booking::create([
        'user_id' => Auth::id(),
        'unit_id' => $data['unit_id'],
        'meeting_room_id' => $data['meeting_room_id'],
        'meeting_date' => $data['meeting_date'],
        'start_time' => $data['start_time'],
        'end_time' => $data['end_time'],
        'participants' => $data['participants'],
        'total_cost' => 0,
      ]);

      $consumptions = $this->calculateConsumption(
        $data['start_time'],
        $data['end_time'],
        $data['participants']
      );

      $total = 0;
      foreach ($consumptions as $c) {
        BookingConsumption::create([
          'booking_id' => $booking->id,
          'type' => $c['type'],
          'price_per_person' => $c['price'],
          'total_price' => $c['total'],
        ]);
        $total += $c['total'];
      }

      $booking->update(['total_cost' => $total]);

      DB::commit();

      return redirect()->route('bookings.index')->with('message', 'Ruangan berhasil di pesan');
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->with('message', 'Terjadi kesalahan saat memproses pemesanan');
    }
  }

  public function destroy(Booking $booking)
  {
    $booking->delete();

    return redirect()->route('bookings.index')->with('message', 'Pemesanan ruangan berhasil dihapus');
  }

  private function calculateConsumption($start, $end, $participants)
  {
    $consumptions = [];

    $start = Carbon::createFromFormat('H:i', $start);
    $end = Carbon::createFromFormat('H:i', $end);

    if ($start->lt(Carbon::createFromTime(11, 0)) && $end->gt(Carbon::createFromTime(8, 0))) {
      $consumptions[] = [
        'type' => 'snack_siang',
        'price' => 20000,
        'total' => $participants * 20000,
      ];
    }

    if ($end->gte(Carbon::createFromTime(11, 0)) && $start->lt(Carbon::createFromTime(14, 0))) {
      $consumptions[] = [
        'type' => 'makan_siang',
        'price' => 30000,
        'total' => $participants * 30000,
      ];
    }

    if ($end->gt(Carbon::createFromTime(14, 0))) {
      $consumptions[] = [
        'type' => 'snack_sore',
        'price' => 20000,
        'total' => $participants * 20000,
      ];
    }

    return $consumptions;
  }
}
