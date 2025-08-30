import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUrl from "../../../hooks/useUrl";
import useQueryParams from "../../../hooks/useQueryParams";
import type { Booking, BookingListQuery } from "../../../types/booking.types";
import { isUndefined, omitBy } from "lodash";
import { bookingApi } from "../../../services/booking.api";

function useBookings() {
    const { currentValue } = useUrl<number>({ field: "page", defaultValue: 1 });
    const page = Number(currentValue);
    const queryClient = useQueryClient();
    const queryParams = useQueryParams<BookingListQuery>();

    const queryConfig: BookingListQuery = omitBy(
        {
            limit: Number(queryParams.limit) || 10,
            page: Number(queryParams.page) || 1,

            status: queryParams.status,
            bookingType: queryParams.bookingType,
            stayType: queryParams.stayType,

            roomId: queryParams.roomId,

            startDate: queryParams.startDate,
            endDate: queryParams.endDate,

            bookingDateFrom: queryParams.bookingDateFrom,
            bookingDateTo: queryParams.bookingDateTo,
        },
        isUndefined
    );

    const { data, isLoading } = useQuery({
        queryKey: ["bookings", queryConfig],
        queryFn: () => bookingApi.getAll(queryConfig),
    });

    const bookings: Booking[] = data?.data?.data.data || [];
    const totalPages = data?.data?.data.meta.totalPages ?? 0;

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", { ...queryConfig, page: page + 1 }],
            queryFn: () =>
                bookingApi.getAll({ ...queryConfig, page: page + 1 }),
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", { ...queryConfig, page: page - 1 }],
            queryFn: () =>
                bookingApi.getAll({ ...queryConfig, page: page - 1 }),
        });
    }

    return { bookings, isLoading, totalPages };
}

export default useBookings;
