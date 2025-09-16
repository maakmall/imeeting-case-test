<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthenticationController,
    BookingController,
    DashboardController,
    UnitController
};

Route::controller(AuthenticationController::class)
    ->middleware('guest')
    ->group(function (): void {
        Route::get('login', 'index')->name('login');
        Route::post('login', 'login')->name('auth');
        Route::delete('logout', 'logout')
            ->name('logout')
            ->withoutMiddleware('guest')
            ->middleware('auth');
    });

Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resources([
        'bookings' => BookingController::class,
        'units' => UnitController::class,
    ]);
});
