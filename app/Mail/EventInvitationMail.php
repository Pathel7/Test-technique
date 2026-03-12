<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $event;
    public $name;
    public $token;

    public function __construct($event, $name, $token)
    {
        $this->event = $event;
        $this->name = $name;
        $this->token = $token;
    }

    public function build()
    {
        return $this->subject('Event Invitation')
            ->view('emails.invitation');
    }
}
