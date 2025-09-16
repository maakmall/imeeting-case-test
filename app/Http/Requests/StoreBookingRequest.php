<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'unit_id' => 'required|exists:units,id',
            'meeting_room_id' => 'required|exists:meeting_rooms,id',
            'meeting_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'participants' => 'required|integer|min:1',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'unit_id.required' => 'Unit wajib diisi.',
            'unit_id.exists' => 'Unit yang dipilih tidak valid.',
            'meeting_room_id.required' => 'Ruang rapat wajib diisi.',
            'meeting_room_id.exists' => 'Ruang rapat yang dipilih tidak valid.',
            'meeting_date.required' => 'Tanggal rapat wajib diisi.',
            'meeting_date.date' => 'Tanggal rapat harus berupa format tanggal yang valid.',
            'start_time.required' => 'Waktu mulai rapat wajib diisi.',
            'start_time.date_format' => 'Waktu mulai rapat harus sesuai format jam (HH:mm).',
            'end_time.required' => 'Waktu selesai rapat wajib diisi.',
            'end_time.date_format' => 'Waktu selesai rapat harus sesuai format jam (HH:mm).',
            'end_time.after' => 'Waktu selesai rapat harus setelah waktu mulai.',
            'participants.required' => 'Jumlah peserta wajib diisi.',
            'participants.integer' => 'Jumlah peserta harus berupa angka.',
            'participants.min' => 'Jumlah peserta minimal adalah 1 orang.',
        ];
    }
}
