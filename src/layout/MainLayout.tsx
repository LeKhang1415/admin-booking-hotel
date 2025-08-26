import { Outlet } from "react-router-dom";
import { closeMobile } from "../store/slices/sidebarSlice";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

function MainLayout() {
    const dispatch = useAppDispatch();
    const { mobileOpen } = useAppSelector((state) => state.sidebar);

    const handleOverlayClick = () => {
        dispatch(closeMobile());
    };

    return (
        <div className="h-screen flex bg-bg text-text">
            {/* Mobile Overlay với backdrop blur */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-all duration-300"
                    onClick={handleOverlayClick}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:static top-0 left-0 h-full z-40 w-72 lg:w-64
                    transform transition-all duration-300 ease-in-out
                    ${
                        mobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }
                    bg-card-bg shadow-card lg:shadow-none
                `}
            >
                <Sidebar />
            </div>

            {/* Main Content với gradient background */}
            <div className="flex-1 flex flex-col h-full overflow-auto transition-all duration-300 ease-in-out">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cream via-yellow-100/50 to-surface" />

                <div className="relative z-10 flex flex-col h-full">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
export default MainLayout;
