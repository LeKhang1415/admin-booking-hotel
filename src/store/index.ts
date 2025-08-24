import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sidebarReducer from "./slices/sidebarSlice";
import authReducer from "./slices/authSlice";
import bookingReducer from "./slices/bookingSlice";
import type { AuthState } from "./slices/authSlice";

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token", "user", "isAuthenticated"],
};

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        booking: bookingReducer,
        auth: persistReducer<AuthState>(authPersistConfig, authReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // để tránh cảnh báo từ redux-persist
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
