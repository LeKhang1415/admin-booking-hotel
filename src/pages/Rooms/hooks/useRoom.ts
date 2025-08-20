import { useQuery } from "@tanstack/react-query";
import { roomApi } from "../../../services/room.api";

function useRoom(id: string) {
    const { data, isLoading } = useQuery({
        queryKey: ["room", id],
        queryFn: () => roomApi.getRoom(id),
    });
    return { room: data?.data?.data, isLoading };
}
export default useRoom;
