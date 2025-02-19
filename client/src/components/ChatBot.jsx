import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatIcon from "./ChatIcon";
import useStore from "../context/ChatStore.js";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hey there! How can I help you?" }, // Default bot message
  ]);
  const [isProcessing, setIsProcessing] = useState(false); // To track the processing state

  const messagesEndRef = useRef(null); // Reference for auto-scrolling

  // Auto-scroll to the bottom whenever new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Set isProcessing to true when sending a request
    setIsProcessing(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=AIzaSyDzJgO3Tas9zcgqKILIC1GwPMlqhdk-zpA`,
        {
          contents: [{ role: "user", parts: [{ text: input }] }],
        }
      );

      const botMessage = {
        role: "bot",
        content:
          response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn't understand that.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: `Error: ${error.message || "Unknown error"}` },
      ]);
    } finally {
      // Set isProcessing to false after the response is received
      setIsProcessing(false);
    }

    setInput(""); // Clear the input field after sending the message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage();
  };

  const { chatBotStatus, setChatBotStatus } = useStore();
  const handleClick = (e) => {
    e.preventDefault();
    setChatBotStatus(false); // Update the status to hide the chatbot
  };

  if (!chatBotStatus) return null; // If chatBotStatus is false, don't render the chatbot

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-sm mx-auto rounded-lg shadow-lg relative bg-gray-950"
    >
      <div className="flex justify-between items-center mb-4">
        <ChatIcon />
        <h2
          className="text-xl font-semibold text-white cursor-pointer"
          onClick={handleClick}
        >
          X
        </h2>
      </div>
      <div
        className="p-4 h-80 overflow-y-auto rounded-lg bg-gray-800 shadow-sm backdrop-blur-md bg-opacity-40"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`mb-2 py-2 px-4 rounded-md ${
              msg.role === "user"
                ? "bg-blue-100 text-blue-700 self-end"
                : "bg-indigo-500 text-white"
            }`}
          >
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
            {msg.content}
          </p>
        ))}
        {isProcessing && (
          <p className="mb-2 py-2 px-4 text-left bg-indigo-500 text-white">
            Bot: Thinking...
          </p>
        )}
        {/* The reference for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
          placeholder="Type your message..."
          disabled={isProcessing} // Disable input when processing
        />
        <button
          type="submit"
          className="ml-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-200"
          disabled={isProcessing} // Disable button when processing
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Chatbot;
