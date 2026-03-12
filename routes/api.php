<?php

use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\InvitationController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::post('auth/register', [AuthenticationController::class, 'register']);
Route::post('auth/login', [AuthenticationController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    // Auth
    Route::get('auth/user', [AuthenticationController::class, 'userInfo']);
    Route::post('auth/logout', [AuthenticationController::class, 'logOut']);
    Route::post('auth/refresh', [AuthenticationController::class, 'refresh']);

    // Events
    Route::apiResource('events', EventController::class);

    // Guests
    Route::apiResource('guests', GuestController::class);

    // Invitations
    Route::post('events/{event}/invite', [InvitationController::class, 'inviteGuests']);
    Route::post('/events/{event}/import-invitations', [InvitationController::class, 'importAndInvite']);
    Route::get('events/{event}/guests', [InvitationController::class, 'eventGuests']);
    Route::post('events/{event}/guests/{guest}/accept', [InvitationController::class, 'accept']);
    Route::post('events/{event}/guests/{guest}/decline', [InvitationController::class, 'decline']);
});


Route::get('/invitations/accept/{token}', function ($token) {

        DB::table('event_guest')
            ->where('invitation_token', $token)
            ->update([
                'status' => 'accepted',
                'responded_at' => now(),
            ]);

        return 'Invitation acceptée';
    });

    Route::get('/invitations/decline/{token}', function ($token) {

        DB::table('event_guest')
            ->where('invitation_token', $token)
            ->update([
                'status' => 'declined',
                'responded_at' => now(),
            ]);

        return 'Invitation refusée';
    });