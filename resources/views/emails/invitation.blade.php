<!DOCTYPE html>
<html>
<head>
    <title>Invitation</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6;">
    <p>Cher(e) <strong>{{ $guest->name }}</strong>,</p> [cite: 38]
    
    <p>Vous êtes invité(e) à l'événement :</p> [cite: 39]
    
    <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
        <h2 style="margin-top: 0;">{{ $event->title }}</h2> [cite: 40]
        <p><strong>Lieu :</strong> {{ $event->location }}</p> [cite: 41]
        <p><strong>Date :</strong> {{ $event->date }} à {{ $event->time }}</p> [cite: 42]
    </div>

    <p>Nous espérons vous y voir.</p> [cite: 43]
</body>
</html>