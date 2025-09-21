import { useEffect } from "react";
import Main from "../../components/Main";
import ChatSection from "./components/ChatSection";
import ConversationsSection from "./components/ConversationsSection";
import { connectSocket } from "../../services/chatSocket";
import { useNavigate } from "react-router-dom";
import { CHAT_EVENTS } from "../../services/socket/events"; // nơi bạn config React Query
import { useQueryClient } from "@tanstack/react-query";

function Chat() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const socket = connectSocket(navigate);

        socket?.on(CHAT_EVENTS.INBOX_UPDATED, (msg) => {
            console.log("📩 Inbox updated:", msg);
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        });

        return () => {
            socket?.off(CHAT_EVENTS.INBOX_UPDATED);
            socket?.disconnect();
        };
    }, [navigate]);

    return (
        <Main>
            <div className="grid grid-cols-10 h-full gap-2">
                <div className="col-span-3">
                    <ConversationsSection />
                </div>
                <div className="col-span-7">
                    <ChatSection />
                </div>
            </div>
        </Main>
    );
}

export default Chat;
