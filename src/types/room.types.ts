import type { TypeRoom } from "./type-room.types";

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
    itemsPerPage?: number;

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
