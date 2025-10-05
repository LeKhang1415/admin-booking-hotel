import type { Booking } from "./booking.types";
import type { Room } from "./room.types";

export interface Review {
    id: string;
    rating: number;
    comment?: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    room: Room;
    booking: Booking;
    createdAt: string;
    updatedAt: string;
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

export type ReviewListQuery = {
    roomId?: string;
    userId?: string;
    rating?: number;
    sortBy?: "createdAt" | "rating";
    sortOrder?: "ASC" | "DESC";
    page?: number;
    limit?: number;
};

export type ReviewResponse = {
    data: Review[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    };
};
