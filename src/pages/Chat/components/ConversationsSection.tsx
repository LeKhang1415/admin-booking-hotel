import { useEffect, useState } from "react";
import { chatApi } from "../../../services/chat.api";
import type { Conversation } from "../../../types/chat.types";
import ConversationItem from "./ConversationItem";
import ConversationsList from "./ConversationsList";

export default function ConversationsSection() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setIsLoading(true);
                const res = await chatApi.getAll();
                const convs = res?.data?.data?.data || [];
                setConversations(convs);
            } catch (error) {
                console.error("Failed to fetch conversations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConversations();
    }, []);

    return (
        <div className="py-4 h-full bg-card-bg shadow-lg rounded-lg relative">
            <div className="px-4">
                <h4 className="font-semibold text-lg mt-2">
                    Messages ({!isLoading ? conversations.length : 0})
                </h4>
            </div>

            {isLoading && (
                <div className="px-4">
                    <p>Loading conversations...</p>
                </div>
            )}

            {!isLoading && !conversations.length && (
                <div className="px-4 text-gray-500">No conversations yet.</div>
            )}

            {!isLoading && (
                <ConversationsList
                    data={conversations}
                    render={(conversation) => {
                        return (
                            <ConversationItem
                                key={conversation.id}
                                conversation={conversation}
                            />
                        );
                    }}
                />
            )}
        </div>
    );
}
