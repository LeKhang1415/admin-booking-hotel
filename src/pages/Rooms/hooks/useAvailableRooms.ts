import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUrl from "../../../hooks/useUrl";
import useQueryParams from "../../../hooks/useQueryParams";
import type { FindAvailableRoomsQuery, Room } from "../../../types/room.types";
import { roomApi } from "../../../services/room.api";
import { cleanObject } from "../../../utils/utils";

function useAvailableRooms() {
    const { currentValue } = useUrl<number>({
        field: "page",
        defaultValue: 1,
    });
    const page = Number(currentValue);
    const queryClient = useQueryClient();
    const queryParams = useQueryParams<FindAvailableRoomsQuery>();

    const queryConfig: FindAvailableRoomsQuery = cleanObject({
        limit: Number(queryParams.limit) || 10,
        page: Number(queryParams.page) || 1,
        priceType: queryParams.priceType, // "day" | "hour"
        typeRoomId: queryParams.typeRoomId || undefined,
        startTime: queryParams.startTime,
        endTime: queryParams.endTime,
        numberOfPeople: queryParams.numberOfPeople
            ? Number(queryParams.numberOfPeople)
            : undefined,
    });

    const { data, isLoading } = useQuery({
        queryKey: ["available-rooms", queryConfig],
        queryFn: () => roomApi.findAvailableRooms(queryConfig),
    });

    const rooms: Room[] = data?.data?.data.data || [];
    const totalPages = data?.data?.data.meta.totalPages ?? 0;

    // Prefetch trước/ sau
    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["available-rooms", { ...queryConfig, page: page + 1 }],
            queryFn: () =>
                roomApi.findAvailableRooms({ ...queryConfig, page: page + 1 }),
        });
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["available-rooms", { ...queryConfig, page: page - 1 }],
            queryFn: () =>
                roomApi.findAvailableRooms({ ...queryConfig, page: page - 1 }),
        });
    }

    return { rooms, isLoading, totalPages };
}

export default useAvailableRooms;
