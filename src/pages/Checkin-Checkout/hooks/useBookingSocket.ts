// useBookingSocket.ts
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import type { Booking } from "../../../types/booking.types";

export function useBookingSocket(
    onNoShow: (booking: Booking) => void,
    onCheckedOut: (booking: Booking) => void
) {
    useEffect(() => {
        const socket: Socket = io("/booking", {
            autoConnect: true,
            path: "/socket.io",
        });

        socket.on("connect", () => console.log("socket connected", socket.id));
        socket.on("bookingNoShow", (b: Booking) => onNoShow(b));
        socket.on("bookingCheckedOut", (b: Booking) => onCheckedOut(b));

        socket.on("disconnect", (r) => console.log("socket disconnect", r));
        socket.on("connect_error", (err) => console.error("socket err", err));

        return () => {
            socket.disconnect();
        };
    }, [onNoShow, onCheckedOut]);
}
