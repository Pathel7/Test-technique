<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use Illuminate\Http\Request;

class GuestController extends Controller
{
    public function index()
    {
        return Guest::all();
    }

    public function store(Request $request)
    {
        return Guest::create($request->all());
    }

    public function show(Guest $guest)
    {
        return $guest->load('events');
    }

    public function update(Request $request, Guest $guest)
    {
        $guest->update($request->all());

        return $guest;
    }

    public function destroy(Guest $guest)
    {
        $guest->delete();

        return response()->json([
            'message' => 'Guest deleted'
        ]);
    }
}
