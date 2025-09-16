import { useEffect } from "react";
import Main from "../../components/Main";
import ChatSection from "./components/ChatSection";
import ConversationsSection from "./components/ConversationsSection";
import { connectSocket } from "../../services/chatSocket";
import { useNavigate } from "react-router-dom";

function Chat() {
    const navigate = useNavigate();

    useEffect(() => {
        const socket = connectSocket(navigate);

        return () => {
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
