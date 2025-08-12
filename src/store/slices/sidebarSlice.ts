import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
    expanded: boolean;
    mobileOpen: boolean;
}

const initialState: SidebarState = {
    expanded: true,
    mobileOpen: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleExpanded: (state) => {
            state.expanded = !state.expanded;
        },
        setExpanded: (state, action: PayloadAction<boolean>) => {
            state.expanded = action.payload;
        },
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

export const {
    toggleExpanded,
    setExpanded,
    toggleMobileOpen,
    setMobileOpen,
    closeMobile,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
