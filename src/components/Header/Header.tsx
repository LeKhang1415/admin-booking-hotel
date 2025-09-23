import { useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import Spinner from "../Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../services/auth.api";
import { logout } from "../../store/slices/authSlice";
import { openMobile } from "../../store/slices/sidebarSlice";

export default function Header() {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const pageName = location.pathname.split("/")[1];

    const { mutate, isPending } = useMutation({
        mutationFn: authApi.logout,
    });

    function handleLogout() {
        mutate(undefined, {
            onSuccess: () => {
                dispatch(logout());
            },
        });
    }

    function handleMobileToggle() {
        dispatch(openMobile());
    }

    return (
        <header className="bg-surface/70 backdrop-blur-sm border-b border-border">
            <div className="flex items-center justify-between px-4 lg:px-6 py-3">
                {/* Left: Menu toggle + breadcrumb */}
                <div className="flex items-center gap-4">
                    {/* Nút toggle menu */}
                    <button
                        onClick={handleMobileToggle}
                        className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <HiMenuAlt2 className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Breadcrumb */}
                    <div className="hidden lg:flex  items-center capitalize gap-2 text-sm">
                        <span className="text-[#A0AEC0]">Pages</span>
                        <span className="text-[#2D3748]">/ {pageName}</span>
                    </div>
                </div>

                {/* Right: user + logout */}
                <div className="flex items-center gap-[18px]">
                    <h4 className="text-sm font-semibold capitalize">
                        {user?.name}
                    </h4>
                    <button
                        className="relative flex items-center gap-2 cursor-pointer py-2 px-3 hover:opacity-60"
                        onClick={handleLogout}
                    >
                        {isPending ? <Spinner size="sm" /> : <FiLogOut />}
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
