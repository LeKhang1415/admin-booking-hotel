export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};
export type UserResponse = {
    data: User[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    };
};
