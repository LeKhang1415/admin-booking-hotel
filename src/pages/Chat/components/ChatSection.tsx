import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";

export default function ChatSection() {
    return (
        <div className="bg-card-bg h-full rounded-lg pt-4 shadow-lg flex flex-col">
            <ChatHeader />
            <ChatBody />
        </div>
    );
}
