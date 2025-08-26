// SidebarItem.tsx
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
                relative flex items-center my-1 font-medium rounded-xl cursor-pointer 
                transition-all duration-200 group overflow-hidden
                ${
                    isActive
                        ? "bg-accent text-black shadow-lg transform scale-[1.02]"
                        : "text-muted hover:bg-yellow-100 hover:text-warm hover:shadow-md"
                }
            `}
        >
            <Link to={href} className="flex items-center w-full py-3 px-3">
                <div
                    className={`
                        p-2 rounded-lg transition-all duration-200 flex-shrink-0
                        ${
                            isActive
                                ? "bg-white/20 text-black shadow-sm"
                                : "bg-cream text-muted-2 group-hover:bg-yellow-200 group-hover:text-warm"
                        }
                    `}
                >
                    {icon}
                </div>
                <span className="overflow-hidden transition-all capitalize ml-3 text-sm font-medium">
                    {text}
                </span>
            </Link>
        </li>
    );
}
