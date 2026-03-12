<?php

namespace App\Models;

use App\Models\EventGuest;
use App\Models\Guest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'description',
        'event_datetime',
        'location',
        'created_by',
    ];

    protected $appends = ['date', 'time'];

    protected $casts = [
        'event_datetime' => 'datetime',
    ];

    public function getTimeAttribute()
    {
        return Carbon::parse($this->event_datetime)->format('H:i');
    }

    public function getDateAttribute()
    {
        return Carbon::parse($this->event_datetime)->format('Y-m-d');
    }

    public function guests()
{
    return $this->belongsToMany(
        Guest::class,
        'event_guests',
        'event_id',
        'guest_id'
    )->withPivot([
        'status',
        'invited_at',
        'responded_at',
        'invitation_token'
    ])->withTimestamps();
}

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
