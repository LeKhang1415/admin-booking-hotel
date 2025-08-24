import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Room } from "../../types/room.types";

export type BookingState = {
    room: Room | null;
    priceType: "hour" | "day";
    numberOfPeople: number;
    startTime: Date | null;
    endTime: Date | null;
};

const initialState: BookingState = {
    room: null,
    priceType: "hour",
    numberOfPeople: 1,
    startTime: null,
    endTime: null,
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBooking: (_state, action: PayloadAction<BookingState>) => {
            return action.payload;
        },
        resetBooking: () => {
            return initialState;
        },
    },
});

export const { setBooking, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
