export interface Guest {
    id: string;
    name: string;
    email: string;
    pivot?: {
        status: 'pending' | 'accepted' | 'declined';
        invited_at: string;
        responded_at?: string;
    };
}