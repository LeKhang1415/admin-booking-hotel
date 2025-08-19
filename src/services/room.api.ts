import type { RoomResponse, RoomsListQuery } from "../types/room.types";
import http from "../utils/http";

export const roomApi = {
    getAllRooms: (params: RoomsListQuery) =>
        http.get<RoomResponse>("/room", { params }),

    createNewRoom: (body: any) =>
        http.post("/room", body, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
};
