// LoginLayout.tsx
import { Outlet } from "react-router-dom";

export default function LoginLayout() {
    return (
        <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-bg text-text">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* Logo + Title */}
                <div className="mt-10 text-center font-bold tracking-tight">
                    <div className="flex items-center justify-center gap-3">
                        <h2 className="uppercase text-sm leading-5 font-bold text-text">
                            Travl Hotel
                        </h2>
                    </div>
                </div>

                {/* Welcome Text */}
                <div className="flex flex-col items-center">
                    <h3 className="text-3xl font-bold text-text">Welcome!</h3>
                    <p className="mt-2 text-sm text-muted">
                        Sign in to continue to your dashboard
                    </p>
                </div>
            </div>

            {/* Login Form */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Outlet />
            </div>
        </div>
    );
}
