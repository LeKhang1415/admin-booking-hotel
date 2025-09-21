import { LuMessageSquareText } from "react-icons/lu";

export default function EmptyChatMessages({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-full h-[490px] flex items-center justify-center">
            <div>
                <LuMessageSquareText size={220} className="mx-auto" />
                <p className="text-center mt-2 font-medium text-slate-400">
                    {children}
                </p>
            </div>
        </div>
    );
}
