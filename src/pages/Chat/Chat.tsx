import { useEffect } from "react";
import Main from "../../components/Main";
import ChatSection from "./components/ChatSection";
import ConversationsSection from "./components/ConversationsSection";
import {
    connectSocket,
    listenConversationRead,
    listenInboxUpdated,
    offConversationRead,
    offInboxUpdated,
} from "../../services/chatSocket";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function Chat() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const socket = connectSocket(navigate);

        listenInboxUpdated(() => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        });

        listenConversationRead(() => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        });

        return () => {
            offInboxUpdated();
            offConversationRead();
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
