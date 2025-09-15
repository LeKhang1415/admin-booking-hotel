// useBookingSocket.ts
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

export function useBookingSocket(
    onNoShow: () => void,
    onCheckedOut: () => void
) {
    useEffect(() => {
        const socket: Socket = io("/booking", {
            autoConnect: true,
            path: "/socket.io",
        });

        socket.on("connect", () => console.log("socket connected", socket.id));
        socket.on("bookingNoShow", () => onNoShow());
        socket.on("bookingCheckedOut", () => onCheckedOut());

        socket.on("disconnect", (r) => console.log("socket disconnect", r));
        socket.on("connect_error", (err) => console.error("socket err", err));

        return () => {
            socket.disconnect();
        };
    }, [onNoShow, onCheckedOut]);
}
