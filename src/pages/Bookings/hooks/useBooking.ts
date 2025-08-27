import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../../../services/booking.api";

function useBooking(id?: string) {
    const { data, isLoading } = useQuery({
        queryKey: ["booking", id],
        queryFn: () => bookingApi.getOne(id!),
        enabled: !!id,
    });
    return { booking: data?.data?.data, isLoading };
}
export default useBooking;
