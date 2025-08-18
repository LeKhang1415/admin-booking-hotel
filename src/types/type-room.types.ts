export type TypeRoom = {
    id: string;
    name: string;
    introduction: string;
    highlight: string;
    sizeRoom: number;
    beds: string;
    maxPeople: number;
};

export type RoomResponse = {
    data: TypeRoom[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    };
};
