import React from "react";
import ChatBot from "./ChatBot";
import useStore from "../context/ChatStore.js";

const Button = () => {
  const { setChatBotStatus, chatBotStatus } = useStore();

  const handleToggle = () => {
    setChatBotStatus(!chatBotStatus); // Toggle the chat bot status
  };

  return (
    <div className="flex items-center flex-col justify-center bg-none text-white fixed bottom-4 z-20 right-14">
      {chatBotStatus && <ChatBot />} {/* Conditionally render ChatBot */}
      {!chatBotStatus && (
        <button
          className="bg-indigo-300 rounded-full px-4 py-2"
          onClick={handleToggle}
        >
          Chat
        </button>
      )}
      {/* ChatBot Component */}
    </div>
  );
};

export default Button;
