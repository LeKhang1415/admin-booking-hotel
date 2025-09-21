import { useSelector, useDispatch } from "react-redux";
import { setSelectedConversation } from "../../../store/slices/selectedConversationSlice";
import classNames from "classnames";
import type { Conversation } from "../../../types/chat.types";
import type { RootState } from "../../../store";
import { truncateText } from "../../../utils/utils";

export default function ConversationItem({
    conversation,
}: {
    conversation: Conversation;
}) {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { selectedConversation } = useSelector(
        (state: RootState) => state.selectedConversation
    );

    const isActive = selectedConversation.id === conversation.id;
    const isFromMe = user?.email === conversation.lastMessageFromEmail;

    const handleClick = () => {
        dispatch(
            setSelectedConversation({
                id: conversation.id,
                userEmail: conversation.userEmail,
            })
        );
    };

    return (
        <li
            className={classNames(
                "cursor-pointer hover:opacity-90 p-3 rounded-lg shadow-sm overflow-hidden",
                isActive ? "bg-gray-200" : "bg-white"
            )}
            onClick={handleClick}
        >
            <div className="flex items-center gap-3">
                {/* Avatar chữ cái đầu */}
                <div className="w-10 h-10 rounded-full hidden md:flex items-center justify-center bg-gradient-to-br from-accent to-accent-600">
                    <span className="text-sm font-semibold text-on-accent">
                        {conversation.userEmail.charAt(0).toUpperCase()}
                    </span>
                </div>

                <div className="flex-1">
                    <h2 className="text-sm font-bold text-main truncate">
                        {truncateText(conversation.userEmail, 25)}
                    </h2>
                    <p className="text-xs text-gray-600 truncate">
                        {isFromMe ? "You: " : ""}{" "}
                        {truncateText(conversation.lastMessageText, 20)}
                    </p>
                </div>

                <div className="ml-auto text-right">
                    {conversation.unreadForAdmin > 0 && !isFromMe && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-600 text-white">
                            {conversation.unreadForAdmin}
                        </span>
                    )}
                </div>
            </div>
        </li>
    );
}
