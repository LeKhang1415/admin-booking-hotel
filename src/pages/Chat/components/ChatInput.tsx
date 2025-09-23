import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../../store";
import {
    sendMessage,
    startTyping,
    stopTyping,
} from "../../../services/chatSocket";
import useDebounce from "../../../hooks/useDebounce";
import { IoMdSend } from "react-icons/io";

function ChatInput() {
    const [text, setText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const { selectedConversation } = useSelector(
        (state: RootState) => state.selectedConversation
    );

    if (!selectedConversation?.conversation?.id) {
        return null;
    }

    const conversationId = selectedConversation.conversation.id;

    const debouncedText = useDebounce(text, 1500);

    useEffect(() => {
        if (conversationId) return;
        if (text) {
            startTyping(conversationId);
        }
    }, [text, selectedConversation?.conversation?.id]);

    // Ngừng gõ → gửi stopTyping
    useEffect(() => {
        if (!conversationId) return;
        if (!debouncedText) {
            stopTyping(conversationId);
        }
    }, [debouncedText, conversationId]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!text.trim() || !conversationId) return;

        sendMessage(conversationId, text.trim());
        setText("");
        stopTyping(conversationId);

        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <form onSubmit={handleSend} className="px-4 mt-auto">
            <div className="flex items-center gap-3">
                <input
                    ref={inputRef}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    onKeyDown={handleKeyDown}
                    className="placeholder:italic block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
                    placeholder="Write your thoughts here..."
                />
                <button type="submit">
                    <IoMdSend size={24} className="fill-primary" />
                </button>
            </div>
        </form>
    );
}

export default ChatInput;
