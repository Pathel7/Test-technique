<?php


namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use App\Mail\EventInvitationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class DirectInvitationImport implements ToCollection
{
    protected $event;
    public $invitedCount = 0;
    public $failedEmails = [];

    public function __construct($event)
    {
        $this->event = $event;
    }

    public function collection(Collection $rows)
{
    foreach ($rows as $index => $row) {

        if ($index == 0) continue;

        $name = $row[0];
        $email = $row[1];

        try {

            $token = Str::uuid();

            Mail::to($email)->send(
                new EventInvitationMail(
                    $this->event,
                    $name,
                    $token
                )
            );

            $this->invitedCount++;

        } catch (\Exception $e) {

            $this->failedEmails[] = [
                'email' => $email,
                'error' => $e->getMessage()
            ];
        }
    }
}
}