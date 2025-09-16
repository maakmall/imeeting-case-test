<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUnitRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|unique:units,name|max:255',
            'meeting_rooms' => 'array',
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
            'name.unique' => 'Nama unit harus unik.',
            'name.max' => 'Nama unit tidak boleh lebih dari 255 karakter.',
            'meeting_rooms.array' => 'Ruang rapat harus berupa array.',
            'meeting_rooms.*.name.required_with' => 'Nama ruang rapat wajib diisi jika kapasitas disediakan.',
            'meeting_rooms.*.name.string' => 'Nama ruang rapat harus berupa string.',
            'meeting_rooms.*.name.max' => 'Nama ruang rapat tidak boleh lebih dari 255 karakter.',
            'meeting_rooms.*.capacity.required_with' => 'Kapasitas ruang rapat wajib diisi jika nama disediakan.',
            'meeting_rooms.*.capacity.integer' => 'Kapasitas ruang rapat harus berupa angka.',
            'meeting_rooms.*.capacity.min' => 'Kapasitas ruang rapat harus minimal 1.',
        ];
    }
}
