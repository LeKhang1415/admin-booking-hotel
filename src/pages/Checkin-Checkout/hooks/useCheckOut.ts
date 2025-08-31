import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../../../services/booking.api";

function useCheckOut() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bookingId: string) => bookingApi.checkOut(bookingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
    });
}

export default useCheckOut;
