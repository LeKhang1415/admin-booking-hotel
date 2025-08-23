export const UserRole = {
    STAFF: "Staff",
    CUSTOMER: "Customer",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
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
