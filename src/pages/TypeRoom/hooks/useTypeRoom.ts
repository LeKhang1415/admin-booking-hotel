import { useQuery } from "@tanstack/react-query";
import { typeRoomApi } from "../../../services/type-room.api";

function useTypeRoom(id: string) {
    const { data, isLoading } = useQuery({
        queryKey: ["typeRooms", id],
        queryFn: () => typeRoomApi.getTypeRoom(id),
    });
    return { typeRoom: data?.data?.data, isLoading };
}
export default useTypeRoom;
