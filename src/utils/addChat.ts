import { generateTextResponse, generateImageResponse, PromptType } from '../utils/apiHelpers';
import { addMessage, ChatMessagesType, CreateNewChat, markMessageAsRead, updateChatSummery } from '../store/slice/chatSlice';
import { Dispatch } from 'redux';

// Function to check if the user's message includes a prompt for image generation
export const identifyImageApi = (content: string): boolean => {
     const imageRegex = /\b(?:generate\s*image|imagine)\b/i; // Matches specific keywords
     return imageRegex.test(content.trim());
};

// Function to add a new message to the chat and trigger API calls for generating responses
export const addChat = async (
     selectChatId: string,
     length: number,
     message: string,
     messages: ChatMessagesType[],
     dispatch: Dispatch
) => {
     let msgId = length + 1;

     // If it's the first message in the chat, update the chat summary
     if (length === 0 && message.trim().length > 0) {
          dispatch(
               updateChatSummery({
                    chatId: selectChatId,
                    messages: messages,
                    summery: message.length < 30 ? message.slice(0, 30) : message.slice(0, 30) + "....."
               })
          );
     }

     // Add the user's message to the Redux store
     dispatch(
          addMessage({
               chatId: selectChatId,
               message: {
                    content: message,
                    time: new Date().toString(),
                    role: 'user',
                    id: msgId,
                    isMessageRead: false,
                    isLoading: false,
               },
          })
     );

     let promptForAssistant: PromptType = {
          content: message,
          time: new Date().toString(),
          role: 'user',
          id: msgId,
          isMessageRead: false,
     };

     // Decide which API to call based on the message content
     if (identifyImageApi(promptForAssistant.content)) {
          generateImageResponse(messages, promptForAssistant, selectChatId, dispatch); // Calls image API
     } else {
          generateTextResponse(messages, promptForAssistant, selectChatId, dispatch); // Calls text API
     }

     // Mark the message as read after adding it
     dispatch(
          markMessageAsRead({
               chatId: selectChatId,
               messageId: msgId,
          })
     );
};