import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { Message } from "../../../types/chat.types";
import { timeAgo } from "../../../utils/utils";

function ChatBubble({ message }: { message: Message }) {
    const { user } = useSelector((state: RootState) => state.auth);
    const isMine = message.fromEmail === user?.email;

    return (
        <div
            className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}
        >
            <div
                className={`max-w-[200px] px-4 py-2 rounded-2xl text-sm shadow
          ${
              isMine
                  ? "bg-blue-500 text-white rounded-br-none text-right"
                  : "bg-gray-200 text-black rounded-bl-none text-left"
          }`}
            >
                <p className="break-all">{message.text}</p>
                <span className="block text-xs mt-1 opacity-70">
                    {timeAgo(message.createdAt)}
                </span>
            </div>
        </div>
    );
}
export default ChatBubble;
