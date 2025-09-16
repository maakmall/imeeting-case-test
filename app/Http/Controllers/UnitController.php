<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUnitRequest;
use App\Http\Requests\UpdateUnitRequest;
use App\Models\Unit;
use App\Models\MeetingRoom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class UnitController extends Controller
{
    public function index(Request $request)
    {
        $units = Unit::withCount('meetingRooms')->latest()->get();

        return Inertia::render('unit/index', [
            'units' => $units,
            'message' => $request->session()->get('success')
        ]);
    }

    public function create()
    {
        return Inertia::render('unit/create');
    }

    public function store(StoreUnitRequest $request)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            $unit = Unit::create([
                'name' => $data['name'],
            ]);

            if (!empty($data['meeting_rooms'])) {
                foreach ($data['meeting_rooms'] as $room) {
                    $unit->meetingRooms()->create($room);
                }
            }
        });

        return redirect()->route('units.index')->with('success', 'Unit berhasil ditambahkan.');
    }

    public function edit(Unit $unit)
    {
        $unit->load('meetingRooms');

        return Inertia::render('unit/edit', [
            'unit' => $unit,
        ]);
    }

    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $unit) {
            $unit->update([
                'name' => $data['name'],
            ]);

            $existingIds = $unit->meetingRooms()->pluck('id')->toArray();
            $incomingIds = collect($data['meeting_rooms'] ?? [])->pluck('id')->filter()->toArray();

            $toDelete = array_diff($existingIds, $incomingIds);
            if (!empty($toDelete)) {
                MeetingRoom::whereIn('id', $toDelete)->delete();
            }

            if (!empty($data['meeting_rooms'])) {
                foreach ($data['meeting_rooms'] as $room) {
                    if (!empty($room['id'])) {
                        $unit->meetingRooms()->where('id', $room['id'])->update([
                            'name' => $room['name'],
                            'capacity' => $room['capacity'],
                        ]);
                    } else {
                        $unit->meetingRooms()->create($room);
                    }
                }
            }
        });

        return redirect()->route('units.index')->with('success', 'Unit & ruang meeting berhasil diperbarui.');
    }

    public function destroy(Unit $unit)
    {
        $unit->delete();

        return redirect()->route('units.index')->with('success', 'Unit berhasil dihapus.');
    }
}
