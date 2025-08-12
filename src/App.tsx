import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { routes } from "./utils/links";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route cha dùng MainLayout */}
                <Route path="/" element={<MainLayout />}>
                    {/* Điều hướng mặc định */}
                    <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                    />

                    {/* Lặp các route con */}
                    {routes.map(({ path, element: Element }) => (
                        <Route key={path} path={path} element={<Element />} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
