import axios, {
    AxiosError,
    type AxiosInstance,
    type InternalAxiosRequestConfig,
    type AxiosResponse,
} from "axios";
import { store } from "../store";
import { logout, setAccessToken } from "../store/slices/authSlice";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:3000/";

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
        // Gắn token vào request
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = store.getState().auth.token;
                if (token) {
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
                if (error.response?.status === 401 && !originalRequest._retry) {
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
            // Gọi API refresh token
            const response = await this.instance.get<{ accessToken: string }>(
                "/users/refresh-token"
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

            store.dispatch(logout());

            return Promise.reject(error);
        } finally {
            this.isRefreshing = false;
        }
    }
}

const http = new Http().instance;
export default http;
