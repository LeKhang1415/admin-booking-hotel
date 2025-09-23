// src/store/slices/selectedConversationSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SelectedConversationType } from "../../types/chat.types";

type SelectedConversationState = {
    selectedConversation: SelectedConversationType;
};

const initialState: SelectedConversationState = {
    selectedConversation: {
        conversation: undefined,
        name: "",
    },
};

const selectedConversationSlice = createSlice({
    name: "selectedConversation",
    initialState,
    reducers: {
        setSelectedConversation: (
            state,
            action: PayloadAction<SelectedConversationType>
        ) => {
            state.selectedConversation = action.payload;
        },
    },
});

export const { setSelectedConversation } = selectedConversationSlice.actions;
export default selectedConversationSlice.reducer;
