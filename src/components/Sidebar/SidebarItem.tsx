import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
    href: string;
    icon: ReactNode;
    text: string;
}

export default function SidebarItem({ href, icon, text }: SidebarItemProps) {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <li
            className={`
                relative flex items-center py-3 px-3 my-1 font-medium rounded-xl cursor-pointer 
                transition-all duration-200 group
                ${
                    isActive
                        ? "bg-[#3a3a3a] text-white"
                        : "text-gray-300 hover:bg-[#3a3a3a] hover:text-white"
                }
            `}
        >
            <Link to={href} className="flex items-center ">
                <div
                    className={`p-2 rounded-lg transition-colors
                        ${
                            isActive
                                ? "bg-gray-500 text-white"
                                : "bg-gray-600 text-gray-300"
                        }
                    `}
                >
                    {icon}
                </div>
                <span
                    className={`
                        overflow-hidden transition-all capitalize w-52 ml-3
                    `}
                >
                    {text}
                </span>
            </Link>
        </li>
    );
}
