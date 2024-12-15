import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type ChatMessagesType = {
     content: string;
     time: string;
     role: "user" | "assistant";
     id: number;
     isMessageRead?: boolean;
     isLoading?: boolean;
     imageUri?: string;
}

export type ChatType = {
     id: string;
     messages: ChatMessagesType[];
     summery: string;
};

type ChatState = {
     chats: ChatType[];
     currentChatId: string;
};

export const initialState: ChatState = {
     chats: [],
     currentChatId: '',
};

const chatSlice = createSlice({
     name: 'chat',
     initialState,
     reducers: {
          addMessage: (
               state,
               action: PayloadAction<{ chatId: string; message: ChatMessagesType }>
          ) => {
               const { chatId, message } = action.payload;
               const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
               if (chatIndex !== -1) {
                    state.chats[chatIndex].messages.push(message);
               }
               console.log("after add message", state.chats)
          },
          clearChatMessages: (state, action: PayloadAction<{ chatId: string }>) => {
               const chatIndex = state.chats.findIndex(chat => chat.id === action.payload.chatId);
               if (chatIndex !== -1) {
                    state.chats[chatIndex].messages = [];
               }
          },
          markMessageAsRead: (state, action: PayloadAction<{ chatId: string; messageId: number }>) => {
               const { chatId, messageId } = action.payload;
               const chat = state.chats.find(chat => chat.id === chatId);

               if (chat) {
                    const message = chat.messages.find(msg => msg.id === messageId)
                    if (message) {
                         message.isMessageRead = true;
                    }
               }
          },
          clearAllChats: state => {
               state.chats = [];
               state.currentChatId = '';
          },
          updateCurrentChatId: (
               state,
               action: PayloadAction<{ chatId: string }>
          ) => {
               state.currentChatId = action.payload.chatId;
          },
          CreateNewChat: (
               state,
               action: PayloadAction<{
                    chatId: string;
                    messages: ChatMessagesType[];
                    summery: string;
               }>
          ) => {
               const { chatId, messages, summery } = action.payload;
               const existingChat = state.chats.find(chat => chat.id === chatId);
               if (!existingChat) {
                    state.chats.push({ id: chatId, messages, summery });
               }
          },
          updateChatSummery: (
               state,
               action: PayloadAction<{
                    chatId: string;
                    messages?: ChatMessagesType[];
                    summery: string
               }>
          ) => {
               const { chatId, messages, summery } = action.payload;
               const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
               if (chatIndex !== -1) {
                    state.chats[chatIndex].summery = summery;
                    if (messages) {
                         state.chats[chatIndex].messages = messages
                    }
               }
          },
          deleteChat: (state, action: PayloadAction<{ chatId: string }>) => {
               state.chats = state.chats.filter(chat => chat.id !== action.payload.chatId);
          },
          addAssistantMessage: (
               state,
               action: PayloadAction<{
                    chatId: string;
                    message: ChatMessagesType
               }>) => {
               const { chatId, message } = action.payload
               const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
               if (chatIndex !== -1) {
                    state.chats[chatIndex].messages.push({
                         ...message,
                         isLoading: true
                    });
               }
          },
          updateAssistantMessage: (
               state,
               action: PayloadAction<{
                    chatId: string;
                    message: ChatMessagesType;
                    messageId: number
               }>) => {
               const { chatId, message, messageId } = action.payload
               const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
               if (chatIndex !== -1) {
                    const messageIndex = state.chats[chatIndex].messages.findIndex(msg => msg.id === messageId)
                    if (messageIndex !== -1) {
                         state.chats[chatIndex].messages[messageIndex] = {
                              ...message,
                              isLoading: false
                         }
                    }
               }
          },
     }
});

export const {
     addMessage,
     clearChatMessages,
     markMessageAsRead,
     clearAllChats,
     updateCurrentChatId,
     CreateNewChat,
     updateChatSummery,
     deleteChat,
     addAssistantMessage,
     updateAssistantMessage
} = chatSlice.actions;

export const selectChats = (state: { chat: ChatState }) => state.chat.chats;
export const selectCurrentChatId = (state: { chat: ChatState }) => state.chat.currentChatId;

export const selectChatMessaages = (state: { chat: ChatState }) => {
     const { currentChatId, chats } = state.chat;
     return chats.find(chat => chat.id === currentChatId)?.messages || [];
}


export default chatSlice.reducer;