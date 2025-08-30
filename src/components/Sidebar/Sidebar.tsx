import { links } from "../../utils/links";
import icons from "../../assets/icons";
import SidebarItem from "./SidebarItem";
import { closeMobile } from "../../store/slices/sidebarSlice";
import { useAppDispatch } from "../../hooks/redux";

export default function Sidebar() {
    const dispatch = useAppDispatch();

    const handleLinkClick = () => {
        // Đóng mobile sidebar khi click vào link trên mobile
        if (window.innerWidth < 1024) {
            dispatch(closeMobile());
        }
    };

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-surface text-text shadow-card border-r border-border">
                {/* Header với logo */}
                <div className="px-4 py-2 flex justify-between items-center border-b border-border flex-shrink-0">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src={icons.logo}
                            alt="Logo"
                            className="w-10 h-10 flex-shrink-0"
                        />
                        <div className="overflow-hidden">
                            <h3 className="text-warm font-bold text-lg uppercase whitespace-nowrap">
                                travl
                            </h3>
                            <span className="text-xs text-muted-2 whitespace-nowrap">
                                Hotel Admin Travel
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <ul className="flex-1 px-3 mt-4 overflow-hidden">
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

                {/* Footer với gradient nhẹ */}
                <div className="p-4 bg-gradient-to-t from-yellow-100/30 to-transparent">
                    <div className="text-xs text-muted-2 text-center">
                        © 2024 Travl Admin
                    </div>
                </div>
            </nav>
        </aside>
    );
}
