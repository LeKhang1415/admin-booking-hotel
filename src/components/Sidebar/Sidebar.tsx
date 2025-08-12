import { links } from "../../utils/links";
import icons from "../../assets/icons";
import { HiMenuAlt2 } from "react-icons/hi";
import SidebarItem from "./SidebarItem";
import { useAppDispatch, useAppSelector } from "../../store";
import { closeMobile, toggleExpanded } from "../../store/slices/sidebarSlice";

export default function Sidebar() {
    const dispatch = useAppDispatch();
    const { expanded } = useAppSelector((state) => state.sidebar);

    const handleToggleExpanded = () => {
        dispatch(toggleExpanded());
    };

    const handleLinkClick = () => {
        // Đóng mobile sidebar khi click vào link trên mobile
        if (window.innerWidth < 1024) {
            dispatch(closeMobile());
        }
    };

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-[#2a2a2a] text-white shadow-sm">
                {/* Header với logo và toggle button */}
                <div className="p-4 pb-2 flex justify-between items-center flex-shrink-0">
                    {/* Logo - chỉ hiện khi expanded */}
                    {expanded && (
                        <div className="flex items-center gap-3">
                            <img
                                src={icons.logo}
                                alt="Logo"
                                className="w-8 h-8 flex-shrink-0"
                            />
                            <div className="overflow-hidden">
                                <h3 className="text-teal-400 font-bold text-lg uppercase whitespace-nowrap">
                                    travl
                                </h3>
                                <span className="text-sm text-gray-300 whitespace-nowrap">
                                    Hotel Admin Travel
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Toggle button - chỉ hiện trên desktop */}
                    <button
                        onClick={handleToggleExpanded}
                        className="ml-2 hidden lg:block p-1.5 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white transition-colors"
                    >
                        <HiMenuAlt2
                            className={`w-5 h-5 transition-transform duration-300 ${
                                expanded ? "rotate-0" : "rotate-180"
                            }`}
                        />
                    </button>
                </div>

                {/* Navigation Links */}
                <ul className="flex-1 px-3 mt-6 overflow-hidden">
                    {links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <div key={link.href} onClick={handleLinkClick}>
                                <SidebarItem
                                    href={link.href}
                                    icon={<Icon className="w-5 h-5" />}
                                    text={link.label.split("-").join(" ")}
                                />
                            </div>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
