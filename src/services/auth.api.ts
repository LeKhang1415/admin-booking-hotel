import http from "../utils/http";

export const authApi = {
    signup: (body: { name: string; email: string; password: string }) => {
        return http.post("/auth/signup", body);
    },
    login: (body: { email: string; password: string }) => {
        return http.post("/auth/login", body);
    },
    logout: () => http.post("/auth/logout"),
    getMe: () => http.get("/auth/get-me"),
};
