import type { BookingListQuery, BookingResponse } from "../types/booking.types";
import type { DeleteResponse, SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const bookingApi = {
    getAllBookings: (params: BookingListQuery) =>
        http.get<SuccessResponseApi<BookingResponse>>("/booking/all", {
            params,
        }),
};
