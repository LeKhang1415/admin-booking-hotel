import { Outlet } from "react-router-dom";

export default function LoginLayout() {
    return (
        <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-primary">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    <div className="center gap-3">
                        <h2 className="uppercase text-[0.875rem] text-white leading-5 font-bold ">
                            Travl Hotel
                        </h2>
                    </div>
                </div>
                <div className="center flex-col mt-1.5 ">
                    <h3 className="text-white text-3xl font-bold">Welcome!</h3>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
