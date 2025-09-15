export interface Conversation {
    id: string;
    userEmail: string;
    adminEmail: string;
    lastMessageText: string;
    lastMessageFromEmail: string;
    lastMessageAt: string;
    unreadForAdmin: number;
    unreadForUser: number;
    createdAt: string;
    updatedAt: string;
}

export type ConversationResponse = {
    data: Conversation[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    };
};
