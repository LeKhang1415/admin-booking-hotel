import { createSlice } from "@reduxjs/toolkit";

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
        openMobile: (state) => {
            state.mobileOpen = true;
        },
        closeMobile: (state) => {
            state.mobileOpen = false;
        },
    },
});

export const { openMobile, closeMobile } = sidebarSlice.actions;

export default sidebarSlice.reducer;
