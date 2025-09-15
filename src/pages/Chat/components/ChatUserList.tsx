import { useEffect, useState } from "react";
import type { Conversation } from "../../../types/chat.types";
import type { User } from "../../../types/user.type";
import { chatApi } from "../../../services/chat.api";

interface ChatUserListProps {
    users?: User[];
    selectedUser: string;
    onSelectUser: (userId: string) => void;
    setConversations?: (convs: Conversation[]) => void;
}

function ChatUserList({
    users,
    selectedUser,
    onSelectUser,
    setConversations,
}: ChatUserListProps) {
    const [conversations, setLocalConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        chatApi.getAll().then((data) => {
            const convs = data?.data?.data.data || [];
            console.log("Fetched conversations:", convs);
            setLocalConversations(convs);
            if (setConversations) setConversations(convs);
        });
    }, [setConversations]);

    return (
        <div className="rounded-2xl p-6 shadow bg-surface card-shadow">
            <h3 className="text-lg font-heading font-bold mb-4 text-text">
                Customer
            </h3>
            <div className="space-y-2">
                {conversations.map((conv) => (
                    <button
                        key={conv.id}
                        onClick={() => onSelectUser(conv.userEmail)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors duration-300 
              ${
                  selectedUser === conv.userEmail
                      ? "bg-elevated border border-border"
                      : "border border-transparent"
              }`}
                    >
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-accent to-accent-600">
                            <span className="text-sm font-semibold text-on-accent">
                                {conv.userEmail.charAt(0).toUpperCase()}
                            </span>
                        </div>

                        <div className="text-left">
                            <div className="text-sm font-body font-semibold truncate max-w-[160px] text-text">
                                {conv.userEmail.length > 22
                                    ? conv.userEmail.slice(0, 22) + "..."
                                    : conv.userEmail}
                            </div>
                            {conv.lastMessageText && (
                                <div className="text-xs mt-1 truncate max-w-[160px] text-muted-2">
                                    {conv.lastMessageText.length > 30
                                        ? conv.lastMessageText.slice(0, 30) +
                                          "..."
                                        : conv.lastMessageText}
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ChatUserList;
