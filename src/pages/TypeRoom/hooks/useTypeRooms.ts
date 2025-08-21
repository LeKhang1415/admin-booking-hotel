import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUrl from "../../../hooks/useUrl";
import useQueryParams from "../../../hooks/useQueryParams";
import type {
    TypeRoom,
    TypeRoomListQuery,
} from "../../../types/type-room.types";
import { isUndefined, omitBy } from "lodash";
import { typeRoomApi } from "../../../services/type-room.api";

function useTypeRooms() {
    const { currentValue } = useUrl<number>({ field: "page", defaultValue: 1 });
    const page = Number(currentValue);
    const queryClient = useQueryClient();
    const queryParams = useQueryParams<TypeRoomListQuery>();

    const queryConfig: TypeRoomListQuery = omitBy(
        {
            limit: Number(queryParams.limit) || 10,
            page: Number(queryParams.page) || 1,

            sizeRoom: queryParams.sizeRoom
                ? Number(queryParams.sizeRoom)
                : undefined,
            maxSize: queryParams.maxSize
                ? Number(queryParams.maxSize)
                : undefined,
            maxPeople: queryParams.maxSize
                ? Number(queryParams.maxSize)
                : undefined,
        },
        isUndefined
    );

    const { data, isLoading } = useQuery({
        queryKey: ["typeRooms", queryConfig],
        queryFn: () => typeRoomApi.getAllTypeRoom(queryConfig),
    });

    const typeRooms: TypeRoom[] = data?.data?.data.data || [];
    const totalPages = data?.data?.data.meta.totalPages ?? 0;

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["typeRooms", { ...queryConfig, page: page + 1 }],
            queryFn: () =>
                typeRoomApi.getAllTypeRoom({ ...queryConfig, page: page + 1 }),
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["typeRooms", { ...queryConfig, page: page - 1 }],
            queryFn: () =>
                typeRoomApi.getAllTypeRoom({ ...queryConfig, page: page - 1 }),
        });
    }

    return { typeRooms, isLoading, totalPages };
}

export default useTypeRooms;
