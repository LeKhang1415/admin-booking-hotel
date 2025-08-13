import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user.type";

export type AuthState = {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    token: null,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            state.isAuthenticated = Boolean(action.payload);
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAccessToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
