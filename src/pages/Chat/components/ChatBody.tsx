import { useSelector } from "react-redux";
import useMessages from "../hooks/useMessages";
import type { RootState } from "../../../store";
import ChatBubble from "./ChatBubble";

function ChatBody() {
    const { selectedConversation } = useSelector(
        (state: RootState) => state.selectedConversation
    );
    const { messages, isLoading } = useMessages(selectedConversation.id, 20);

    if (isLoading) return <div>Loading...</div>;
    if (!messages) return <div>No messages</div>;
    return (
        <div className="flex-1 p-4 overflow-y-auto h-full">
            {messages?.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
            ))}
        </div>
    );
}

export default ChatBody;
