import type { Review } from "../services/review.api";
import type { Payment } from "./payment.types";
import type { Room } from "./room.types";
import type { User } from "./user.type";

export const StayType = {
    HOURLY: "hourly",
    DAILY: "daily",
} as const;
export type StayType = (typeof StayType)[keyof typeof StayType];

export const BookingType = {
    ONLINE: "online",
    WALK_IN: "walk_in",
} as const;
export type BookingType = (typeof BookingType)[keyof typeof BookingType];

export const BookingStatus = {
    UNPAID: "unpaid",
    PAID: "paid",
    CHECKED_IN: "checked_in",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
    REJECTED: "rejected",
} as const;
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

// Main Booking interface
export type Booking = {
    bookingId: string;
    startTime: string;
    endTime: string;
    actualCheckIn: string | null;
    actualCheckOut: string | null;
    stayType: StayType;
    bookingType: BookingType;
    bookingStatus: BookingStatus;
    bookingDate: string; // ISO string
    numberOfGuest: number;
    user: User;
    room: Room;
    review: Review | null;
    payments: Payment[];
    totalAmount: number;
    extraCharges: number;
};

export type BookingResponse = {
    data: Booking[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    };
};

// Query filters
export type BookingListQuery = {
    status?: BookingStatus;
    bookingType?: BookingType;
    stayType?: StayType;
    roomId?: string;
    startDate?: string;
    endDate?: string;
    bookingDateFrom?: string;
    bookingDateTo?: string;
    page?: number;
    limit?: number;
};
