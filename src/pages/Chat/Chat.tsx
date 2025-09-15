import ChatUserList from "./components/ChatUserList";

function Chat() {
    return (
        <div className="p-6">
            <ChatUserList
                users={[]}
                selectedUser={""}
                onSelectUser={(id) => console.log("Selected user:", id)}
                setConversations={(convs) =>
                    console.log("Fetched convs:", convs)
                }
            />
        </div>
    );
}

export default Chat;
