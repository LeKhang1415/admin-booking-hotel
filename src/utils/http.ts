import axios, {
    AxiosError,
    type AxiosInstance,
    type InternalAxiosRequestConfig,
    type AxiosResponse,
} from "axios";
import { store } from "../store";
import { logout, setAccessToken } from "../store/slices/authSlice";
import { authApi } from "../services/auth.api";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:3000/";

// Instance riêng chỉ để refresh token, không có interceptor
const refreshInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

class Http {
    instance: AxiosInstance;
    private isRefreshing = false;
    private refreshQueue: Array<{
        resolve: (token: string) => void;
        reject: (error: any) => void;
    }> = [];

    constructor() {
        this.instance = axios.create({
            baseURL: API_BASE_URL,
            withCredentials: true,
            timeout: 10000,
            headers: { "Content-Type": "application/json" },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Gắn token vào request (trừ request refresh-token)
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const isRefresh = config.url?.includes("/auth/refresh-token");
                const token = store.getState().auth.token;

                if (token && !isRefresh) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }
        );
        // Xử lý response và lỗi
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const originalRequest =
                    error.config as InternalAxiosRequestConfig & {
                        _retry?: boolean;
                    };

                // Nếu lỗi 401 và chưa retry
                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    !originalRequest.url?.includes("/auth/refresh-token") // tránh loop
                ) {
                    originalRequest._retry = true;

                    // Nếu đang refresh token, đợi trong queue
                    if (this.isRefreshing) {
                        return this.addToRefreshQueue(originalRequest);
                    }

                    return this.handleTokenRefresh(originalRequest);
                }

                return Promise.reject(error);
            }
        );
    }

    private addToRefreshQueue(originalRequest: InternalAxiosRequestConfig) {
        return new Promise((resolve, reject) => {
            this.refreshQueue.push({
                resolve: (token: string) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(this.instance(originalRequest));
                },
                reject,
            });
        });
    }

    private async handleTokenRefresh(
        originalRequest: InternalAxiosRequestConfig
    ) {
        this.isRefreshing = true;

        try {
            // Gọi API refresh token bằng axios riêng, không gắn Authorization
            const response = await refreshInstance.get<{ accessToken: string }>(
                "/auth/refresh-token"
            );
            const newToken = response.data.accessToken;

            // Cập nhật token trong store
            store.dispatch(setAccessToken(newToken));

            // Xử lý các request đang chờ
            this.refreshQueue.forEach(({ resolve }) => resolve(newToken));
            this.refreshQueue = [];

            // Retry request ban đầu
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.instance(originalRequest);
        } catch (error) {
            // Refresh token thất bại -> logout
            this.refreshQueue.forEach(({ reject }) => reject(error));
            this.refreshQueue = [];

            await this.logoutUser();

            return Promise.reject(error);
        } finally {
            this.isRefreshing = false;
        }
    }

    private async logoutUser(): Promise<void> {
        store.dispatch(logout());

        try {
            await authApi.logout();
        } catch (error) {
            console.warn("Logout API call failed:", error);
        }
    }
}

const http = new Http().instance;
export default http;
