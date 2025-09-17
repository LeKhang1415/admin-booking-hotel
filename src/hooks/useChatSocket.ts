import { useEffect, useState, useCallback } from "react";
import { Socket } from "socket.io-client";
import type { Message } from "../types/chat.types";
import { useQueryClient } from "@tanstack/react-query";

export function useChatSocket(conversationId?: string, socket?: Socket | null) {
    const queryClient = useQueryClient();
    const [isTyping, setIsTyping] = useState(false);

    // Join / Leave room theo conversationId
    useEffect(() => {
        if (!conversationId || !socket) return;

        // join room
        socket.emit("joinRoom", JSON.stringify({ conversationId }));

        socket.on("message", (msg: Message) => {
            if (msg.conversationId === conversationId) {
                queryClient.invalidateQueries({
                    queryKey: ["messages", conversationId],
                });
            }
        });

        // lắng nghe typing
        socket.on("typing", (payload: any) => {
            if (payload.conversationId === conversationId) {
                setIsTyping(payload.isTyping);
            }
        });

        return () => {
            // leave room khi unmount
            socket?.emit("leaveRoom", JSON.stringify({ conversationId }));
            socket?.off("message");
            socket?.off("typing");
        };
    }, [conversationId]);

    // gửi message
    const sendMessage = useCallback(
        (text: string, toUserEmail?: string) => {
            if (!socket || !conversationId) return;
            socket.emit(
                "send",
                JSON.stringify({
                    text,
                    toUserEmail,
                    conversationId,
                })
            );
        },
        [conversationId]
    );

    // gửi trạng thái typing
    const sendTyping = useCallback(
        (isTyping: boolean, toUserEmail?: string) => {
            if (!socket || !conversationId) return;
            socket.emit("typing", {
                conversationId,
                toUserEmail,
                isTyping,
            });
        },
        [conversationId]
    );

    return {
        isTyping,
        sendMessage,
        sendTyping,
    };
}
