<?php

namespace App\Models;

use App\Models\Event;
use App\Models\Guest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventGuest extends Model
{
    use HasFactory;

    protected $table = 'event_guests';

    protected $fillable = [
        'event_id',
        'guest_id',
        'status',
        'invited_at',
        'responded_at'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }
}
