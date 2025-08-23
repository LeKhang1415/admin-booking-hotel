import type { Room } from "../types/room.types";

export interface Review {
    id: string;
    rating: number; // 1-5
    comment?: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    room: Room;
    booking: {
        bookingId: string;
    };
    isActive: boolean;
}

export interface CreateReviewDto {
    rating: number;
    comment?: string;
    roomId: string;
    bookingId: string;
    userId: string;
}

export interface UpdateReviewDto {
    rating?: number;
    comment?: string;
    isActive?: boolean;
}
