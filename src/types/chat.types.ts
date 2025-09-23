import type { User } from "./user.type";

export const MessageStatus = {
    SENT: "sent",
    DELIVERED: "delivered",
    READ: "read",
} as const;

export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];

export interface Conversation {
    id: string;
    user: User;
    admin: User;
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
    conversation?: Conversation;
    name: string;
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
