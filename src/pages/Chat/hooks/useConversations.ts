import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../../../services/chat.api";
import useQueryParams from "../../../hooks/useQueryParams";

function useConversations() {
    const queryParams = useQueryParams<{ search?: string }>();

    const { data, isLoading } = useQuery({
        queryKey: ["conversations", queryParams.search],
        queryFn: () => chatApi.getAll(queryParams.search || ""),
    });

    return {
        conversations: data?.data?.data.data,
        isLoading,
    };
}

export default useConversations;
