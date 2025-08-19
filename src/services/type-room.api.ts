import type {
    TypeRoom,
    TypeRoomListQuery,
    TypeRoomResponse,
} from "../types/type-room.types";
import http from "../utils/http";

export const typeRoomApi = {
    getAllTypeRoom: (params: TypeRoomListQuery) =>
        http.get<TypeRoomResponse>("/type-room", { params }),
    getAllTypeRoomWithoutPagination: () =>
        http.get<TypeRoom[]>("/type-room/all"),
};
