<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    public function index()
    {
        return Event::with('guests')->get();
    }

    public function store(Request $request)
    {
        
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'location' => 'required|string|max:255',
        ]);

        $event = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'event_datetime' => $request->date.' '.$request->time,
            'location' => $request->location,
            'created_by' => auth()->id(),
        ]);

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        return $event->load('guests');
    }

    public function update(Request $request, Event $event)
    {
        $event->update($request->all());

        return $event;
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'message' => 'Event deleted',
        ]);
    }
}
