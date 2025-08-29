import type {
    CreateUserDto,
    UpdateUserDto,
    User,
    UserListQuery,
    UserResponse,
} from "../types/user.type";
import type { DeleteResponse, SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const userApi = {
    getAllUser: (params: UserListQuery) =>
        http.get<SuccessResponseApi<UserResponse>>("/users", { params }),

    getUser: (id: string) => http.get<SuccessResponseApi<User>>(`/users/${id}`),

    createUser: (body: CreateUserDto) =>
        http.post<SuccessResponseApi<User>>("/users", body),

    updateUser: ({ body, id }: { body: UpdateUserDto; id: string }) =>
        http.post<SuccessResponseApi<User>>(`/users/${id}`, body),

    deleteUser: (id: string) => http.delete<DeleteResponse>(`/users/${id}`),
};
