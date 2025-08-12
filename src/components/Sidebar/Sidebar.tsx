import { useLocation, Link } from "react-router-dom";
import { links } from "../../utils/links";
import icons from "../../assets/icons";

function Sidebar() {
    const location = useLocation();

    return (
        <div className="h-full text-white bg-[#2a2a2a] p-4">
            <div className="p-4 flex flex-col h-full">
                <div className="start gap-3 flex">
                    <img src={icons.logo} alt="Logo" />
                    <div>
                        <h3 className="text-main font-bold text-lg uppercase">
                            travl
                        </h3>
                        <span className="text-sm">Hotel Admin Travel</span>
                    </div>
                </div>
                <ul className="w-full mt-[24px] ">
                    {links.map((link) => {
                        const isActive = location.pathname === link.href;
                        const Icon = link.icon;

                        return (
                            <li key={link.href}>
                                <Link
                                    to={link.href}
                                    className={`${
                                        isActive
                                            ? "bg-[#242424] shadow-custom"
                                            : "bg-transparent"
                                    } rounded-2xl py-4 px-5 flex items-center gap-3`}
                                >
                                    <div className={`"bg-white" p-[7.5px]`}>
                                        <Icon className={`w-5 h-5`} />
                                    </div>
                                    <span
                                        className={`text-main text-base font-bold capitalize`}
                                    >
                                        {link.label.split("-").join(" ")}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
