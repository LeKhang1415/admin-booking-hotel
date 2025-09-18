import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUrl from "../../../hooks/useUrl";
import useQueryParams from "../../../hooks/useQueryParams";
import type { Booking, TodayBookingQuery } from "../../../types/booking.types";
import { isUndefined, omitBy } from "lodash";
import { bookingApi } from "../../../services/booking.api";

function useTodayBooking() {
    const { currentValue } = useUrl<number>({ field: "page", defaultValue: 1 });
    const page = Number(currentValue);
    const queryClient = useQueryClient();
    const queryParams = useQueryParams<TodayBookingQuery>();

    const queryConfig: TodayBookingQuery = omitBy(
        {
            limit: Number(queryParams.limit) || 10,
            page: Number(queryParams.page) || 1,
            search: queryParams.search || undefined,
            status: queryParams.status || undefined,
        },
        isUndefined
    );

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["today-booking", queryConfig],
        queryFn: () => bookingApi.getTodayBooking(queryConfig),
    });

    const todayBookings: Booking[] = data?.data?.data.data || [];
    const totalPages = data?.data?.data.meta.totalPages ?? 0;

    // Prefetch trang kế tiếp
    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["today-booking", { ...queryConfig, page: page + 1 }],
            queryFn: () =>
                bookingApi.getTodayBooking({ ...queryConfig, page: page + 1 }),
        });
    }

    // Prefetch trang trước
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["today-booking", { ...queryConfig, page: page - 1 }],
            queryFn: () =>
                bookingApi.getTodayBooking({ ...queryConfig, page: page - 1 }),
        });
    }

    return { todayBookings, isLoading, totalPages, refetch };
}

export default useTodayBooking;
