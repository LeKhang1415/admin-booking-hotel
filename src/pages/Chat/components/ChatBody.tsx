import { useSelector } from "react-redux";
import useMessages from "../hooks/useMessages";
import type { RootState } from "../../../store";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import {
    joinRoom,
    leaveRoom,
    listenNewMessage,
    offNewMessage,
} from "../../../services/chatSocket";
import type { Message } from "../../../types/chat.types";
import EmptyChatMessages from "./EmptyChatMessages";

function ChatBody() {
    const { selectedConversation } = useSelector(
        (state: RootState) => state.selectedConversation
    );
    const { messages: initialMessages, isLoading } = useMessages(
        selectedConversation.id,
        20
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        if (initialMessages) {
            setMessages(initialMessages);
        }
    }, [initialMessages]);

    useEffect(() => {
        if (!selectedConversation?.id) return;

        joinRoom(selectedConversation.id);

        listenNewMessage((msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            leaveRoom(selectedConversation.id);
            offNewMessage();
        };
    }, [selectedConversation.id]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col relative">
            {!messages.length && (
                <EmptyChatMessages>
                    No messages yet. Start the conversation!
                </EmptyChatMessages>
            )}
            {!!messages.length && (
                <div className="py-4 px-2 mx-2 max-w-full h-[490px] max-h-full overflow-y-auto space-y-2 relative">
                    {messages.map((msg) => (
                        <ChatBubble key={msg.id} message={msg} />
                    ))}
                    <div ref={bottomRef} />
                </div>
            )}

            <div className="px-2 py-3 border-t border-border">
                <ChatInput />
            </div>
        </div>
    );
}

export default ChatBody;
