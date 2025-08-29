import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../../services/user.api";

function useUser(id: string) {
    const { data, isLoading } = useQuery({
        queryKey: ["users", id],
        queryFn: () => userApi.getUser(id),
    });
    return { user: data?.data?.data, isLoading };
}
export default useUser;
