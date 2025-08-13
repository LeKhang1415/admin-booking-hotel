// layouts/MainLayout.tsx
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
        <div className="bg-[#171717] h-screen flex">
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 z-30"
                    onClick={handleOverlayClick}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                fixed lg:static top-0 left-0 h-full z-40 w-72 lg:w-64
                transform transition-all duration-300 ease-in-out
                ${
                    mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }
               
            `}
            >
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div
                className={`
                flex-1 flex flex-col h-full overflow-auto
                transition-all duration-300 ease-in-out
            `}
            >
                {/* Header */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
