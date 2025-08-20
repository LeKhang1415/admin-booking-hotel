import type { User } from "./user.type";
import type { SuccessResponseApi } from "./utils.type";

export type AuthResponse = SuccessResponseApi<{
    accessToken: string;
    user: User;
}>;
