import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../../../services/chat.api";

function useConversations() {
    const { data, isLoading } = useQuery({
        queryKey: ["conversations"],
        queryFn: () => chatApi.getAll(),
    });

    return {
        conversations: data?.data?.data.data,
        isLoading,
    };
}

export default useConversations;
