import ConversationItem from "./ConversationItem";
import ConversationsList from "./ConversationsList";
import useConversations from "../hooks/useConversations";

export default function ConversationsSection() {
    const { conversations, isLoading } = useConversations();

    if (!conversations) return null;

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
