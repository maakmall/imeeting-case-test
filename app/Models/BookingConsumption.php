<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingConsumption extends Model
{
    protected $fillable = [
        'booking_id',
        'type',
        'price_per_person',
        'total_price',
    ];
}
