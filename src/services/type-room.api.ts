import type {
    TypeRoom,
    TypeRoomListQuery,
    TypeRoomResponse,
} from "../types/type-room.types";
import type { DeleteResponse, SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const typeRoomApi = {
    getAllTypeRoom: (params: TypeRoomListQuery) =>
        http.get<SuccessResponseApi<TypeRoomResponse>>("/type-room", {
            params,
        }),
    getAllTypeRoomWithoutPagination: () =>
        http.get<SuccessResponseApi<TypeRoom[]>>("/type-room/all"),

    createNewTypeRoom: (body: any) =>
        http.post<SuccessResponseApi<TypeRoom>>("/type-room", body),

    getTypeRoom: (id: string) =>
        http.get<SuccessResponseApi<TypeRoom>>(`/type-room/${id}`),

    updateTypeRoom: ({ body, id }: { body: any; id: string }) =>
        http.post<SuccessResponseApi<TypeRoom>>(`/type-room/${id}`, body),

    deleteTypeRoom: (id: string) =>
        http.delete<DeleteResponse>(`/type-room/${id}`),
};
