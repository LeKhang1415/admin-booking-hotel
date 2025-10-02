// useBookingSocket.ts
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

export function useBookingSocket(
    onNoShow: (booking: any) => void,
    onCheckedOut: (booking: any) => void
) {
    useEffect(() => {
        const socket: Socket = io("http://localhost:3000/booking", {
            transports: ["websocket"],
            autoConnect: true,
        });

        socket.on("connect", () =>
            console.log("✅ socket connected:", socket.id)
        );

        socket.on("bookingNoShow", (booking) => {
            console.log("📢 bookingNoShow:", booking);
            onNoShow(booking);
        });

        socket.on("bookingCheckedOut", (booking) => {
            console.log("📢 bookingCheckedOut:", booking);
            onCheckedOut(booking);
        });

        socket.on("disconnect", (reason) =>
            console.log("❌ socket disconnected:", reason)
        );

        socket.on("connect_error", (err) =>
            console.error("⚠️ socket connection error:", err)
        );

        return () => {
            socket.disconnect();
        };
    }, [onNoShow, onCheckedOut]);
}
