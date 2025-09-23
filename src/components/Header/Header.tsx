import { useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Spinner from "../Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../services/auth.api";
import { logout } from "../../store/slices/authSlice";

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

    return (
        <header>
            <div className=" flex items-center justify-between flex-1 overflow-y-auto px-4 lg:px-6 py-3 bg-surface/70 backdrop-blur-sm border-b border-border">
                <div className="flex items-center capitalize gap-2 text-sm">
                    <span className="text-[#A0AEC0]">Pages</span>
                    <span className="text-[#2D3748]">/ {pageName}</span>
                </div>
                <div className="center gap-[18px]">
                    <h4 className="text-sm font-semibold capitalize">
                        {user?.name}
                    </h4>
                    <button
                        className="relative center gap-3 cursor-pointer py-2 px-3 hover:opacity-60"
                        onClick={handleLogout}
                    >
                        {isPending ? <Spinner size="sm" /> : <FiLogOut />}
                        logout
                    </button>
                </div>
            </div>
        </header>
    );
}
