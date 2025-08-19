import type { TypeRoom } from "./type-room.types";

// Dữ liệu trả về từ API (đầy đủ)
export type Room = {
    id: string;
    name: string;
    pricePerDay: number;
    pricePerHour: number;
    interior: string;
    image: string;
    facilities: string;
    roomStatus: "active" | "inactive";
    typeRoom: TypeRoom;
};

export type RoomResponse = {
    data: Room[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    };
};

export type RoomsListQuery = {
    // Pagination fields
    page?: number;
    limit?: number;

    // Room filter fields
    roomStatus?: "active" | "inactive";
    minPricePerDay?: number;
    maxPricePerDay?: number;
    minPricePerHour?: number;
    maxPricePerHour?: number;
    maxPeople?: number;

    // Type room filters
    typeRoomId?: string;
};
