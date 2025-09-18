import type {
    MessageResponse,
    ConversationResponse,
} from "../types/chat.types";
import type { SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const chatApi = {
    getAll: (search: string) =>
        http.get<SuccessResponseApi<ConversationResponse>>("/chat", {
            params: {
                search: search || "",
            },
        }),

    getMessages: (conversationId: string, limit: number = 30) =>
        http.get<SuccessResponseApi<MessageResponse>>(
            `/chat/${conversationId}/messages`,
            {
                params: { limit },
            }
        ),
};
