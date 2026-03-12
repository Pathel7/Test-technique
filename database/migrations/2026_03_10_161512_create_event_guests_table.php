<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_guests', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('event_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignUuid('guest_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->enum('status', [
                'pending',
                'accepted',
                'declined',
                'cancelled',
            ])->default('pending');

            $table->timestamp('invited_at')->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->uuid('invitation_token')->unique();

            $table->timestamps();
            $table->unique(['event_id', 'guest_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_guests');
    }
};
