export type TypeRoom = {
    id: string;
    name: string;
    introduction: string;
    highlight: string;
    sizeRoom: number;
    beds: string;
    maxPeople: number;
};

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
