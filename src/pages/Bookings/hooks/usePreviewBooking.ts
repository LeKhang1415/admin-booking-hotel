import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios"; // 👈 import thêm
import { bookingApi } from "../../../services/booking.api";
import type {
    BookingPreviewDto,
    BookingPreviewResponse,
} from "../../../types/booking.types";
import type { SuccessResponseApi } from "../../../types/utils.type";

function usePreviewBooking(
    payload: BookingPreviewDto | null,
    isUpdate = false
) {
    const { data, isLoading, error, isError } = useQuery<
        SuccessResponseApi<BookingPreviewResponse>,
        AxiosError<{ message: string }>
    >({
        queryKey: ["booking-preview", payload, isUpdate],
        queryFn: async () => {
            const res = await bookingApi.preview(payload!, isUpdate);
            return res.data;
        },
        enabled:
            !!payload?.roomId &&
            !!payload?.startTime &&
            !!payload?.endTime &&
            !!payload?.stayType,
        staleTime: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });

    return {
        preview: data?.data,
        isLoading,
        error,
        isError,
    };
}

export default usePreviewBooking;
