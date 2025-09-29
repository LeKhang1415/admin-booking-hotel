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
    listenTyping,
    markAsRead,
    offNewMessage,
    offTyping,
} from "../../../services/chatSocket";
import type { Message } from "../../../types/chat.types";
import EmptyChatMessages from "./EmptyChatMessages";
import TypingIndicator from "./TypingIndicator";

function ChatBody() {
    const { selectedConversation } = useSelector(
        (state: RootState) => state.selectedConversation
    );

    const conversationId = selectedConversation.conversation?.id;

    const userEmail = selectedConversation.conversation?.user.email;

    const userName = selectedConversation.conversation?.user.name;

    const { messages: initialMessages, isLoading } = useMessages(
        conversationId,
        20
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const [isTyping, setIsTyping] = useState<boolean>(false);

    useEffect(() => {
        listenTyping((typingData: any) => {
            if (typingData.conversationId === conversationId) {
                if (typingData.isTyping) {
                    setIsTyping(true);
                } else {
                    setIsTyping(false);
                }
            }
        });

        return () => {
            offTyping();
        };
    }, [conversationId]);
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
        if (!conversationId) return;

        joinRoom(conversationId);

        listenNewMessage((msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        markAsRead(conversationId, userEmail);

        return () => {
            leaveRoom(conversationId);
            offNewMessage();
        };
    }, [conversationId]);

    if (!conversationId) {
        return (
            <div className="flex align-center justify-center h-full">
                <EmptyChatMessages>
                    No conversation selected. Pick a chat to start messaging!
                </EmptyChatMessages>
            </div>
        );
    }

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
            {isTyping && <TypingIndicator userName={userName} />}
            <div className="px-2 py-3 border-t border-border">
                <ChatInput />
            </div>
        </div>
    );
}

export default ChatBody;
