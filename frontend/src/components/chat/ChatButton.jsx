import React, { useState } from "react";
import { IoMdChatboxes } from "react-icons/io";
import Chat from "./Chat";

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={toggleChat}
        className="fixed bottom-8 right-6 sm:bottom-5 sm:right-5 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer transform transition-transform hover:scale-110"
      >
        <IoMdChatboxes size={30} />
      </div>

      <Chat isOpen={isChatOpen} toggleChat={toggleChat} />
    </>
  );
};

export default ChatButton;
