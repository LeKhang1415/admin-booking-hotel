import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isUndefined, omitBy } from "lodash";
import useUrl from "../../../hooks/useUrl";
import useQueryParams from "../../../hooks/useQueryParams";
import type { Room, RoomsListQuery } from "../../../types/room.types";
import { roomApi } from "../../../services/room.api";

function useRooms() {
    // Lấy page hiện tại từ URL (?page=...); defaultValue = 1
    const { currentValue } = useUrl<number>({ field: "page", defaultValue: 1 });
    const page = Number(currentValue);
    const queryClient = useQueryClient();
    const queryParams = useQueryParams<RoomsListQuery>();

    const queryConfig: RoomsListQuery = omitBy(
        {
            limit: Number(queryParams.limit) || 10,
            page: Number(queryParams.page) || 1,
            roomStatus: queryParams.roomStatus,
            minPricePerDay: queryParams.minPricePerDay
                ? Number(queryParams.minPricePerDay)
                : undefined,
            maxPricePerDay: queryParams.maxPricePerDay
                ? Number(queryParams.maxPricePerDay)
                : undefined,
            minPricePerHour: queryParams.minPricePerHour
                ? Number(queryParams.minPricePerHour)
                : undefined,
            maxPricePerHour: queryParams.maxPricePerHour
                ? Number(queryParams.maxPricePerHour)
                : undefined,
            maxPeople: queryParams.maxPeople
                ? Number(queryParams.maxPeople)
                : undefined,
            typeRoomId: queryParams.typeRoomId,
        },
        isUndefined
    );

    const { data, isLoading } = useQuery({
        queryKey: ["rooms", queryConfig],
        queryFn: () => roomApi.getAllRooms(queryConfig),
    });

    const rooms: Room[] = data?.data.data || [];
    const totalPages = data?.data.meta.totalPages ?? 0;

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["rooms", { ...queryConfig, page: page + 1 }],
            queryFn: () =>
                roomApi.getAllRooms({ ...queryConfig, page: page + 1 }),
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["rooms", { ...queryConfig, page: page - 1 }],
            queryFn: () =>
                roomApi.getAllRooms({ ...queryConfig, page: page - 1 }),
        });
    }

    return { rooms, isLoading, totalPages };
}

export default useRooms;
