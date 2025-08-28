import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { UpdateBookingDto } from "../../../types/booking.types";
import { bookingApi } from "../../../services/booking.api";

interface UseUpdateBookingProps {
    onSuccess?: () => void;
    onError?: (error: any) => void;
}

export default function useUpdateBooking(
    bookingId: string,
    options?: UseUpdateBookingProps
) {
    const queryClient = useQueryClient();

    // Mutation function
    const mutationFn = (data: UpdateBookingDto) =>
        bookingApi.update(bookingId, data);

    // Success handler
    const handleSuccess = (_response: any) => {
        // Invalidate cache
        queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
        queryClient.invalidateQueries({ queryKey: ["bookings"] });

        toast.success("Booking updated successfully!");

        // Custom callback
        options?.onSuccess?.();
    };

    // Error handler
    const handleError = (error: any) => {
        const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to update booking";

        toast.error(errorMessage);

        // Custom callback
        options?.onError?.(error);
    };

    return useMutation({
        mutationFn,
        onSuccess: handleSuccess,
        onError: handleError,
    });
}
