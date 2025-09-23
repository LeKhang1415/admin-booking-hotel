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

    if (!selectedConversation?.id) {
        return null;
    }

    const debouncedText = useDebounce(text, 1500);

    useEffect(() => {
        if (!selectedConversation?.id) return;
        if (text) {
            startTyping(selectedConversation.id);
        }
    }, [text, selectedConversation?.id]);

    // Ngừng gõ → gửi stopTyping
    useEffect(() => {
        if (!selectedConversation?.id) return;
        if (!debouncedText) {
            stopTyping(selectedConversation.id);
        }
    }, [debouncedText, selectedConversation?.id]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!text.trim() || !selectedConversation?.id) return;

        sendMessage(selectedConversation.id, text.trim());
        setText("");
        stopTyping(selectedConversation.id);

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
