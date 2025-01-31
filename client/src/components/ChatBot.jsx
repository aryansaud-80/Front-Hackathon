import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([{ type: "bot", text: "Hello! How can I assist you today?" }]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages([...newMessages, { type: "bot", text: "I'm still learning, but I'll try my best to help!" }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-20 right-5 bg-gray-900 w-80 sm:w-96 h-[450px] rounded-2xl shadow-lg flex flex-col text-white z-50 "
    >
      {/* Chat Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center rounded-t-2xl ">
        <h2 className="text-lg font-bold">AI Chatbot</h2>
        <button onClick={onClose} className="text-purple-500 hover:text-purple-400">
          <AiOutlineClose size={24} />
        </button>
      </div>

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`max-w-xs p-3 rounded-lg ${msg.type === "user" ? "bg-purple-500 ml-auto" : "bg-gray-700 mr-auto"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      {/* Input Field */}
      <div className="bg-gray-800 p-3 flex items-center rounded-b-2xl">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="ml-2 bg-purple-500 p-2 rounded-r-lg hover:bg-purple-600">
          <AiOutlineSend size={24} />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatBot;