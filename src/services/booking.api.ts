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

//
// ==== STAFF BOOKING API ====
//
export const bookingApi = {
    getAll: (params: BookingListQuery) =>
        http.get<SuccessResponseApi<BookingResponse>>("/booking/all", {
            params,
        }),

    getOne: (id: string) =>
        http.get<SuccessResponseApi<Booking>>(`/booking/${id}`),

    create: (data: CreateBookingDto) =>
        http.post<SuccessResponseApi<Booking>>("/booking", data),

    // update: (id: string, data: UpdateBookingDto) =>
    //     http.post<SuccessResponseApi<Booking>>(`/booking/${id}`, data),

    reject: (id: string) =>
        http.post<SuccessResponseApi<Booking>>(`/booking/reject-booking/${id}`),

    preview: (data: BookingPreviewDto) =>
        http.post<SuccessResponseApi<BookingPreviewResponse>>(
            "/booking/preview",
            data
        ),
};
