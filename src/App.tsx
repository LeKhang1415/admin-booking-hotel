import {
    Route,
    BrowserRouter,
    Routes,
    Navigate,
    Outlet,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { routes } from "./utils/links";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "./hooks/redux";
import Login from "./pages/Login";
import { PersistGate } from "redux-persist/integration/react";
import LoginLayout from "./layout/LoginLayout";
import NotFound from "./pages/NotFound";

function ProtectedRoutes() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function RejectedRoutes() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

function App() {
    return (
        <Provider store={store}>
            {/* PersistGate đảm bảo auth state được restore trước khi render */}
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        {/* Routes cho user chưa đăng nhập */}
                        <Route element={<RejectedRoutes />}>
                            <Route element={<LoginLayout />}>
                                <Route path="/login" element={<Login />} />
                            </Route>
                        </Route>

                        {/* Routes cho user đã đăng nhập */}
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/" element={<MainLayout />}>
                                {/* Điều hướng mặc định */}
                                <Route
                                    index
                                    element={
                                        <Navigate to="dashboard" replace />
                                    }
                                />

                                {/* Lặp các route con */}
                                {routes.map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>

                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 2000,
                        },
                        error: {
                            duration: 3000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "#fff",
                            color: "#131717",
                        },
                    }}
                />
            </PersistGate>
        </Provider>
    );
}

export default App;
