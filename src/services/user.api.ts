import type { User, UserResponse } from "../types/user.type";
import type { SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const roomApi = {
    getAllRooms: () => http.get<SuccessResponseApi<UserResponse>>("/users"),

    createNewRoom: (body: any) =>
        http.post<SuccessResponseApi<User>>("/users", body),
};
