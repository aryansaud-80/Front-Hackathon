import { create } from 'zustand';

const useStore = create((set) => ({
  // Chat history state and actions
  chatHistory: [],
  chatBotStatus: false,
  
  // Add message to chat history
  addToChatHistory: (message) => set((state) => ({
    chatHistory: [...state.chatHistory, message],
  })),


  setChatBotStatus: (status) => set({ chatBotStatus: status }),
  
  // Optionally clear chat history
  clearChatHistory: () => set({ chatHistory: [] }),
}));

export default useStore;
