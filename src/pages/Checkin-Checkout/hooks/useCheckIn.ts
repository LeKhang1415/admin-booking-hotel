import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../../../services/booking.api";

function useCheckIn() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bookingId: string) => bookingApi.checkIn(bookingId),
        onSuccess: () => {
            // invalidate dữ liệu booking
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["today-booking"] });
            queryClient.invalidateQueries({ queryKey: ["today-summary"] });
        },
    });
}

export default useCheckIn;
