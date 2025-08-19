export type TypeRoom = {
    id: string;
    name: string;
    introduction: string;
    highlight: string;
    sizeRoom: number;
    beds: string;
    maxPeople: number;
};

export type TypeRoomResponse = {
    data: TypeRoom[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    };
};

export type TypeRoomListQuery = {
    // Pagination fields
    page?: number;
    limit?: number;

    sizeRoom?: number;
    maxSize?: number;
    maxPeople?: number;
};
