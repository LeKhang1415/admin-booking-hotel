import { useQuery } from "@tanstack/react-query";
import { typeRoomApi } from "../../../services/type-room.api";

function useAllTypeRooms() {
    const { data, isLoading } = useQuery({
        queryKey: ["allTypeRooms"],
        queryFn: () => typeRoomApi.getAllTypeRoomWithoutPagination(),
    });
    return { typeRoom: data?.data?.data, isLoading };
}
export default useAllTypeRooms;
