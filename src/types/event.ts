import type { Guest } from "./guest";

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    guests?: Guest[];
}

export interface EventFormData {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
}
