<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Guest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Str;
use App\Imports\GuestsImport;
use App\Imports\DirectInvitationImport;
use App\Mail\EventInvitationMail;


class InvitationController extends Controller
{

public function importAndInvite(Request $request, Event $event)
    {
        $request->validate([
        'file'=>'required|file|mimes:xlsx,csv'
    ]);

    // Option 1: Envoi direct sans BDD
    $import = new DirectInvitationImport($event);
    Excel::import($import, $request->file('file'));

    return response()->json([
        'message' => 'Invitations envoyées',
        'invited_count' => $import->invitedCount,
        'failed_emails' => $import->failedEmails
    ]);
    }


    public function inviteGuests(Request $request, Event $event)
    {
        $request->validate([
            'guest_ids' => 'required|array',
            'guest_ids.*' => 'exists:guests,id',
        ]);

        $guestIds = $request->guest_ids;

        $data = [];

        foreach ($guestIds as $guestId) {

            $data[$guestId] = [
                'status' => 'pending',
                'invited_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        $event->guests()->syncWithoutDetaching($data);

        return response()->json([
            'message' => 'Invitations sent successfully',
        ]);
    }

    public function eventGuests(Event $event)
    {
        return $event->guests()->withPivot([
            'status',
            'invited_at',
            'responded_at',
        ])->get();
    }

    public function accept(Event $event, Guest $guest)
    {
        DB::table('event_guest')
            ->where('event_id', $event->id)
            ->where('guest_id', $guest->id)
            ->update([
                'status' => 'accepted',
                'responded_at' => now(),
            ]);

        return response()->json([
            'message' => 'Invitation accepted',
        ]);
    }

    public function decline(Event $event, Guest $guest)
    {
        DB::table('event_guest')
            ->where('event_id', $event->id)
            ->where('guest_id', $guest->id)
            ->update([
                'status' => 'declined',
                'responded_at' => now(),
            ]);

        return response()->json([
            'message' => 'Invitation declined',
        ]);
    }
}
