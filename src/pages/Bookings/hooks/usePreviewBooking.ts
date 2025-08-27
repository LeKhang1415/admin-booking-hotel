import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../../../services/booking.api";
import type { BookingPreviewDto } from "../../../types/booking.types";

function usePreviewBooking(payload: BookingPreviewDto) {
    const { data, isLoading } = useQuery({
        queryKey: ["booking-preview", payload],
        queryFn: () => bookingApi.preview(payload),
        enabled: !!payload.roomId,
    });

    return {
        preview: data?.data?.data,
        isLoading,
    };
}

export default usePreviewBooking;
