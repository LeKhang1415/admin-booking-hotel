import { HiMenuAlt2 } from "react-icons/hi";
import { useAppDispatch } from "../../store";
import { toggleMobileOpen } from "../../store/slices/sidebarSlice";

export default function Header() {
    const dispatch = useAppDispatch();

    const handleMobileToggle = () => {
        dispatch(toggleMobileOpen());
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 lg:px-6">
            <div className="flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button
                    onClick={handleMobileToggle}
                    className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <HiMenuAlt2 className="w-6 h-6 text-gray-700" />
                </button>

                {/* Page Title */}
                <div className="flex-1 lg:flex-none">
                    <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 ml-4 lg:ml-0">
                        Concierge List
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Notifications and User Menu */}
                <div className="flex items-center space-x-4">
                    {/* Messages */}
                    <button className="relative p-2 text-gray-400 hover:text-gray-600">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            76
                        </span>
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-400 hover:text-gray-600">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-5 5v-5z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093L10.97 4.97z"
                            />
                        </svg>
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            4
                        </span>
                    </button>

                    {/* Chat */}
                    <button className="relative p-2 text-gray-400 hover:text-gray-600">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            15
                        </span>
                    </button>

                    {/* User Avatar */}
                    <div className="flex items-center space-x-3">
                        <img
                            src="https://ui-avatars.com/api/?background=14b8a6&color=ffffff&bold=true&name=Admin"
                            alt="User Avatar"
                            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                        />
                        <div className="hidden lg:block">
                            <p className="text-sm font-medium text-gray-700">
                                Admin User
                            </p>
                            <p className="text-xs text-gray-500">
                                admin@travl.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
