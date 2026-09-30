import React from "react";
import toast from "react-hot-toast";

const ChatPage = () => {
    return (
        <div>
            <button onClick={() => toast.success("You are clicked")}>
                clicksss me
            </button>
        </div>
    );
};

export default ChatPage;
