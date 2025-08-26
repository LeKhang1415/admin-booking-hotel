import type {
    BookingListQuery,
    BookingResponse,
    Booking,
    BookingPreviewDto,
    CreateBookingDto,
    BookingPreviewResponse,
} from "../types/booking.types";
import type { SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const bookingApi = {
    // Lấy danh sách booking
    getAllBookings: (params: BookingListQuery) =>
        http.get<SuccessResponseApi<BookingResponse>>("/booking/all", {
            params,
        }),

    // Preview booking (tính tiền, check room)
    previewBooking: (data: BookingPreviewDto) =>
        http.post<SuccessResponseApi<BookingPreviewResponse>>(
            "/booking/preview",
            data
        ),

    // Create booking
    createBooking: (data: CreateBookingDto) =>
        http.post<SuccessResponseApi<Booking>>("/booking", data),
};
