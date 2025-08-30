import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../../../services/booking.api";

function useTodaySummary() {
    const { data, isLoading } = useQuery({
        queryKey: ["today-summary"],
        queryFn: () => bookingApi.getTodaySummary(),
    });
    return { todaySummary: data?.data?.data, isLoading };
}
export default useTodaySummary;
