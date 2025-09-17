import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../../../services/chat.api";

function useMessages(conversationId?: string, limit: number = 30) {
    const { data, isLoading } = useQuery({
        queryKey: ["messages", conversationId, limit],
        queryFn: () => chatApi.getMessages(conversationId!, limit),
        enabled: !!conversationId,
    });

    return {
        messages: data?.data?.data.items,
        isLoading,
    };
}

export default useMessages;
