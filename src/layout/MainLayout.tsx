import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainLayout() {
    return (
        <div className="bg-[#171717] h-screen">
            <div className="container mx-auto h-full">
                <div className=" grid items-start grid-cols-12 gap-4 h-full">
                    {/* Sidebar - Ẩn trên mobile, hiện trên desktop */}
                    <div className="sm:hidden lg:block lg:col-span-3 h-full bg-[#2a2a2a]  shadow-custom">
                        <Sidebar />
                    </div>

                    {/* Main Content Area */}
                    <div className="col-span-12 lg:col-span-9 flex flex-col h-full overflow-auto relative">
                        {/* Header */}
                        <Header />

                        {/* Page Content - React Router Outlet */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
