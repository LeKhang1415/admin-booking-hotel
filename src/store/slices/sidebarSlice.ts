import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
    mobileOpen: boolean;
}

const initialState: SidebarState = {
    mobileOpen: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleMobileOpen: (state) => {
            state.mobileOpen = !state.mobileOpen;
        },
        setMobileOpen: (state, action: PayloadAction<boolean>) => {
            state.mobileOpen = action.payload;
        },
        closeMobile: (state) => {
            state.mobileOpen = false;
        },
    },
});

export const { toggleMobileOpen, setMobileOpen, closeMobile } =
    sidebarSlice.actions;

export default sidebarSlice.reducer;
