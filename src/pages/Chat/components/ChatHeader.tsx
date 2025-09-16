import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

export default function ChatHeader() {
    const { selectedConversation } = useSelector(
        (state: RootState) => state.selectedConversation
    );

    if (!selectedConversation.userEmail) return null;

    return (
        <div className="flex items-center gap-10 pb-3 px-4 border-b-2 border-gray-100">
            <div className="flex gap-[14px] items-center">
                <figure>
                    {/* Avatar bằng chữ cái đầu */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-accent to-accent-600">
                        <span className="text-sm font-semibold text-on-accent">
                            {selectedConversation.userEmail
                                .charAt(0)
                                .toUpperCase()}
                        </span>
                    </div>
                </figure>
                <div>
                    <h2 className="text-main text-sm font-bold">
                        {selectedConversation?.userEmail}
                    </h2>
                </div>
            </div>
        </div>
    );
}
