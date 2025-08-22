import type { Room, RoomResponse, RoomsListQuery } from "../types/room.types";
import type { DeleteResponse, SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const roomApi = {
    getAllRooms: (params: RoomsListQuery) =>
        http.get<SuccessResponseApi<RoomResponse>>("/room", { params }),

    createNewRoom: (body: any) =>
        http.post<SuccessResponseApi<Room>>("/room", body, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),

    getRoom: (id: string) => http.get<SuccessResponseApi<Room>>(`/room/${id}`),

    updateRoom: ({ body, id }: { body: any; id: string }) =>
        http.post<SuccessResponseApi<Room>>(`/room/${id}`, body, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
    deleteRoom: (id: string) => http.delete<DeleteResponse>(`/room/${id}`),
};
