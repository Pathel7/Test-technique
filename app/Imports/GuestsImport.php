<?php

namespace App\Imports;

use App\Models\Guest;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class GuestsImport implements ToCollection
{
    public $guests = [];

    public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {

            if($index == 0) continue;

            $guest = Guest::firstOrCreate([
                'email' => $row[1]
            ],[
                'name' => $row[0],
                
            ]);

            $this->guests[] = $guest;
        }
    }
}