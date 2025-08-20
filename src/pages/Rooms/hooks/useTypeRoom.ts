import { useQuery } from "@tanstack/react-query";
import { typeRoomApi } from "../../../services/type-room.api";

function useTypeRoom() {
    const { data, isLoading } = useQuery({
        queryKey: ["type-room"],
        queryFn: () => typeRoomApi.getAllTypeRoomWithoutPagination(),
    });

    return {
        typeRoom: data?.data?.data ?? [],
        isLoading,
    };
}

export default useTypeRoom;
