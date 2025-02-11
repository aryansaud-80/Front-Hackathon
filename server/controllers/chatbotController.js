// // config/openaiConfig.js
// import OpenAI from 'openai';
// import 'dotenv/config';

// const openai = new OpenAI({
//   apiKey: process.env.API_SECRET_KEY,
// });

// export const GPT35_CONFIG = {
//   model: 'gpt-3.5-turbo',
//   temperature: 0.7,
//   max_tokens: 150,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
// };

// export default openai;

// // controllers/chatbotController.js

// export const handleChatbotRequest = async (req, res) => {
//   const { userMessage, systemMessage = 'You are a helpful assistant.' } =
//     req.body;

//   try {
//     // Input validation
//     if (!userMessage || userMessage.trim() === '') {
//       return res.status(400).json({
//         success: false,
//         error: 'Validation Error',
//         message: 'User message is required',
//       });
//     }

//     // Prepare messages array with system and user messages
//     const messages = [
//       {
//         role: 'system',
//         content: systemMessage,
//       },
//       {
//         role: 'user',
//         content: userMessage,
//       },
//     ];

//     // Make the API call
//     const response = await openai.chat.completions.create({
//       ...GPT35_CONFIG,
//       messages,
//       stream: false, // Set to true if you want to implement streaming responses
//     });

//     // Extract and send the response
//     const botMessage = response.choices[0].message.content;
//     res.json({
//       success: true,
//       botMessage,
//       timestamp: new Date().toISOString(),
//       usage: response.usage, // Include token usage information
//     });
//   } catch (error) {
//     // Enhanced error handling
//     if (error instanceof OpenAI.APIError) {
//       console.error('OpenAI API Error:', {
//         status: error.status,
//         message: error.message,
//         code: error.code,
//         type: error.type,
//       });

//       // Handle specific API errors
//       if (error.status === 429) {
//         return res.status(429).json({
//           success: false,
//           error: 'Rate Limit Error',
//           message: 'Too many requests. Please try again later.',
//         });
//       }

//       res.status(error.status || 500).json({
//         success: false,
//         error: 'OpenAI API Error',
//         message: error.message,
//       });
//     } else {
//       console.error('Unexpected error:', error);
//       res.status(500).json({
//         success: false,
//         error: 'Internal Server Error',
//         message: 'An unexpected error occurred',
//       });
//     }
//   }

// };

import OpenAI from 'openai'; // Use require('openai') if using CommonJS
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.API_SECRET_KEY,
});

export const handleChatbotRequest = async (req, res) => {
  const { userMessage, systemMessage = 'You are a helpful assistant.' } =
    req.body;

  try {
    if (!userMessage || userMessage.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'User message is required',
      });
    }

    const messages = [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userMessage },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 150,
    });

    const botMessage = response.choices[0].message.content;
    res.json({
      success: true,
      botMessage,
      timestamp: new Date().toISOString(),
      usage: response.usage,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
    });
  }
};
