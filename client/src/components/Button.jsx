import React, { useState } from 'react';
import ChatBot from './ChatBot';
import { motion } from 'framer-motion';
import { AiFillMessage } from "react-icons/ai";

const Button = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className='flex items-center justify-center bg-gray-900 text-white '>
      {/* Chatbox Button */}
      <motion.button
        onClick={() => setChatOpen(true)}
        className='fixed bottom-5 right-5 bg-purple-500 text-white p-3 rounded-full shadow-lg text-lg font-semibold hover:bg-purple-600 z-50 cursor-pointer'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AiFillMessage className='text-2xl' />
      </motion.button>

      {/* ChatBot Component */}
      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default Button;
