import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { routes } from "./utils/links";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
    return (
        <Provider store={store}>
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
                            <Route
                                key={path}
                                path={path}
                                element={<Element />}
                            />
                        ))}
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
