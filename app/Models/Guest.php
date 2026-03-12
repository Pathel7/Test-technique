<?php

namespace App\Models;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
     use HasFactory;

    protected $fillable = [
        'name',
        'email'
    ];

    public function events()
{
    return $this->belongsToMany(
        Event::class,
        'event_guests',
        'guest_id',
        'event_id'
    )->withPivot([
        'status',
        'invited_at',
        'responded_at',
        'invitation_token'
    ])->withTimestamps();
}
}
