import { io, Socket } from "socket.io-client";
import { store } from "../store";
import { setAccessToken, logout } from "../store/slices/authSlice";
import http from "../utils/http";
import toast from "react-hot-toast";
import { CHAT_EVENTS } from "./socket/events";

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

// Join room
export const joinRoom = (conversationId: string, toUserEmail?: string) => {
    socket?.emit(
        CHAT_EVENTS.JOIN_CONVERSATION,
        JSON.stringify({ conversationId, toUserEmail })
    );
};

// Leave room
export const leaveRoom = (conversationId: string) => {
    socket?.emit(
        CHAT_EVENTS.LEFT_CONVERSATION,
        JSON.stringify({ conversationId })
    );
};

// Send message
export const sendMessage = (
    conversationId: string,
    text: string,
    toUserEmail?: string
) => {
    socket?.emit(
        CHAT_EVENTS.SEND_MESSAGE,
        JSON.stringify({ conversationId, text, toUserEmail })
    );
};

// Bật typing
export const startTyping = (conversationId: string, toUserEmail?: string) => {
    socket?.emit(CHAT_EVENTS.TYPING, {
        conversationId,
        toUserEmail,
        isTyping: true,
    });
};

// Tắt typing
export const stopTyping = (conversationId: string, toUserEmail?: string) => {
    socket?.emit(CHAT_EVENTS.TYPING, {
        conversationId,
        toUserEmail,
        isTyping: false,
    });
};

// Listen message
export const listenNewMessage = (cb: (msg: any) => void) => {
    socket?.on(CHAT_EVENTS.NEW_MESSAGE, cb);
};

// Stop listen
export const offNewMessage = () => {
    socket?.off(CHAT_EVENTS.NEW_MESSAGE);
};

// Listen inbox update (admin)
export const listenInboxUpdated = (cb: (msg: any) => void) => {
    socket?.on("inboxUpdated", cb);
};
export const offInboxUpdated = () => {
    socket?.off("inboxUpdated");
};
