import { useQuery } from "@tanstack/react-query";
import { roomApi } from "../../../services/room.api";

function useAllRooms() {
    const { data, isLoading } = useQuery({
        queryKey: ["allRooms"],
        queryFn: () => roomApi.getAllRoomWithoutPagination(),
    });
    return { rooms: data?.data?.data, isLoading };
}
export default useAllRooms;
