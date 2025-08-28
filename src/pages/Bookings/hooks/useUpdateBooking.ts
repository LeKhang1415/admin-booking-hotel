import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { UpdateBookingDto } from "../../../types/booking.types";
import { bookingApi } from "../../../services/booking.api";

interface UseUpdateBookingProps {
    onSuccess?: () => void;
    onError?: (error: any) => void;
}

const useUpdateBooking = (
    bookingId: string,
    options?: UseUpdateBookingProps
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateBookingDto) =>
            bookingApi.update(bookingId, data),

        onSuccess: (_response) => {
            // Invalidate và refetch booking data
            queryClient.invalidateQueries({
                queryKey: ["booking", bookingId],
            });

            // Invalidate booking list nếu cần
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });

            toast.success("Booking updated successfully!");

            // Gọi callback success nếu có
            options?.onSuccess?.();
        },

        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to update booking";

            toast.error(errorMessage);

            // Gọi callback error nếu có
            options?.onError?.(error);
        },
    });
};

export default useUpdateBooking;
