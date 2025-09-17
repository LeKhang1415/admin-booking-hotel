export const MessageStatus = {
    SENT: "sent",
    DELIVERED: "delivered",
    READ: "read",
} as const;

export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];

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

export type SelectedConversationType = {
    id: string;
    userEmail: string;
};

export type Attachment = {
    url: string;
    type?: string;
    size?: number;
};

export type Message = {
    id: string;
    conversationId: string;
    fromEmail: string;
    toEmail: string;
    text?: string;
    attachments?: Attachment[];
    status: MessageStatus;
    createdAt: string;
    updatedAt: string;
};

export type MessageResponse = {
    items: Message[];
};
