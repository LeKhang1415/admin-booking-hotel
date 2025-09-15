import type { Conversation, ConversationResponse } from "../types/chat.types";
import type { SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const chatApi = {
    getAll: () => http.get<SuccessResponseApi<ConversationResponse>>("/chat"),
};
