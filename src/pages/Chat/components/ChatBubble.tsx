import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { Message } from "../../../types/chat.types";

function ChatBubble({ message }: { message: Message }) {
    const { user } = useSelector((state: RootState) => state.auth);
    const isMine = message.fromEmail === user?.email;

    return (
        <div
            className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}
        >
            <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow
          ${
              isMine
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
          }`}
            >
                <p>{message.text}</p>
                <span className="block text-xs mt-1 opacity-70">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
        </div>
    );
}
export default ChatBubble;
