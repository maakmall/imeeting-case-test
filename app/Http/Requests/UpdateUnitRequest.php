<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUnitRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|unique:units,name,' . $this->route('unit')->id . '|max:255',
            'meeting_rooms' => 'array',
            'meeting_rooms.*.id' => 'nullable|exists:meeting_rooms,id',
            'meeting_rooms.*.name' => 'required_with:meeting_rooms.*.capacity|string|max:255',
            'meeting_rooms.*.capacity' => 'required_with:meeting_rooms.*.name|integer|min:1',
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
            'name.required' => 'Nama unit wajib diisi.',
            'name.unique' => 'Nama unit sudah digunakan.',
            'name.max' => 'Nama unit tidak boleh lebih dari 255 karakter.',
            'meeting_rooms.array' => 'Ruang rapat harus berupa array.',
            'meeting_rooms.*.id.exists' => 'ID ruang rapat tidak valid.',
            'meeting_rooms.*.name.required_with' => 'Nama ruang rapat wajib diisi jika kapasitas diisi.',
            'meeting_rooms.*.name.string' => 'Nama ruang rapat harus berupa teks.',
            'meeting_rooms.*.name.max' => 'Nama ruang rapat tidak boleh lebih dari 255 karakter.',
            'meeting_rooms.*.capacity.required_with' => 'Kapasitas ruang rapat wajib diisi jika nama diisi.',
            'meeting_rooms.*.capacity.integer' => 'Kapasitas ruang rapat harus berupa angka.',
            'meeting_rooms.*.capacity.min' => 'Kapasitas ruang rapat harus minimal 1.',
        ];
    }
}
