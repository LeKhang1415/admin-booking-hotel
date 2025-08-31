import type {
    BookingListQuery,
    BookingResponse,
    Booking,
    BookingPreviewDto,
    CreateBookingDto,
    BookingPreviewResponse,
    UpdateBookingDto,
    TodayBookingQuery,
    BookingSummary,
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
    getTodayBooking: (params: TodayBookingQuery) =>
        http.get<SuccessResponseApi<BookingResponse>>(
            "/booking/today/booking",
            {
                params,
            }
        ),

    getTodaySummary: () =>
        http.get<SuccessResponseApi<BookingSummary>>("/booking/today/summary"),

    getOne: (id: string) =>
        http.get<SuccessResponseApi<Booking>>(`/booking/${id}`),

    create: (data: CreateBookingDto) =>
        http.post<SuccessResponseApi<Booking>>("/booking", data),

    update: (id: string, data: UpdateBookingDto) =>
        http.post<SuccessResponseApi<Booking>>(`/booking/${id}`, data),

    reject: (id: string) =>
        http.post<SuccessResponseApi<Booking>>(`/booking/reject-booking/${id}`),

    markAsPaid: (id: string) =>
        http.post<SuccessResponseApi<Booking>>(`/booking/mark-as-paid/${id}`),

    checkIn: (id: string) =>
        http.post<SuccessResponseApi<Booking>>(`/booking/check-in/${id}`),

    checkOut: (id: string) =>
        http.post<SuccessResponseApi<Booking>>(`/booking/check-out/${id}`),

    preview: (data: BookingPreviewDto, isUpdate = false) => {
        console.log("📦 Preview payload gửi lên:", data, "isUpdate:", isUpdate);
        return http.post<SuccessResponseApi<BookingPreviewResponse>>(
            `/booking/preview?isUpdate=${isUpdate}`,
            data
        );
    },
};
