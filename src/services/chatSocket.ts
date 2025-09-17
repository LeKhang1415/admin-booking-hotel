import { io, Socket } from "socket.io-client";
import { store } from "../store";
import { setAccessToken, logout } from "../store/slices/authSlice";
import http from "../utils/http";
import toast from "react-hot-toast";

let socket: Socket | null = null;

export const connectSocket = (navigate: (path: string, opts?: any) => void) => {
    const token = store.getState().auth.token;

    socket = io("http://localhost:3000/chat", {
        transports: ["websocket"],
        auth: { token: `Bearer ${token}` },
    });

    socket.on("connect", () => {
        console.log("✅ Socket connected", socket?.id);
    });

    socket.on("connect_error", async (err) => {
        console.warn("❌ Socket connect_error:", err.message);

        if (err.message === "Unauthorized") {
            try {
                // gọi API refresh token
                const res = await http.post("/auth/refresh-token");
                const newToken = res.data.data.accessToken;

                // lưu token mới vào store
                store.dispatch(setAccessToken(newToken));

                // gắn lại token vào socket và reconnect
                (socket?.io.opts as any).auth = { token: `Bearer ${newToken}` };
                socket?.connect();

                toast.success("🔄 Phiên đăng nhập được làm mới");
            } catch (refreshErr) {
                console.error("Refresh token fail:", refreshErr);
                toast.error(
                    "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
                );

                store.dispatch(logout());
                navigate("/login", { replace: true });
            }
        } else {
            toast.error("Lỗi kết nối server. Vui lòng thử lại.");
            navigate("/", { replace: true });
        }
    });

    return socket;
};
