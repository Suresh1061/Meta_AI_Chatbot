import EventSource from 'react-native-sse';
import { Dispatch } from 'redux';
import { updateAssistantMessage, addAssistantMessage, ChatMessagesType } from '../store/slice/chatSlice';
import { HUGGING_API_KEY, HUGGING_API_URL } from './constant';


export type PromptType = {
     content: string;
     time: string;
     role: "user" | "assistant";
     id: number;
     isMessageRead?: boolean;
}

type ApiResponse = {
     messages: ChatMessagesType[],
     prompt: PromptType,
     chatId: string,
     dispatch: Dispatch
}

export const generateTextResponse = (
     messages: ChatMessagesType[],
     prompt: PromptType,
     chatId: string,
     dispatch: Dispatch
) => {
     const id = messages.length + 2;

     dispatch(
          addAssistantMessage({
               chatId,
               message: { content: '', time: new Date().toString(), role: 'assistant', id },
          })
     );

     const eventSource = new EventSource(HUGGING_API_URL, {
          method: "POST",
          headers: {
               Authorization: `Bearer ${HUGGING_API_KEY}`,
               "Content-Type": "application/json",
          },
          pollingInterval: 0,
          body: JSON.stringify({
               model: "meta-llama/Meta-Llama-3-8B-Instruct",
               messages: [...messages, prompt],
               max_tokens: 500,
               stream: true,
          }),
     });

     let content = "";
     let responseComplete = false;

     // Event listener for incoming data
     eventSource.addEventListener("message", (event) => {
          try {
               if (event.data && event.data !== "[DONE]") {
                    const parsedData = JSON.parse(event.data);
                    if (parsedData.choices && parsedData.choices.length > 0) {

                         // delta represent a chunk of words like -> "hello" "_" "world"
                         const delta = parsedData.choices[0].delta?.content || "";
                         if (delta) {
                              content += delta;

                              // Update the assistant's message with the current content
                              dispatch(
                                   updateAssistantMessage({
                                        chatId: chatId,
                                        messageId: id,
                                        message: {
                                             content,
                                             time: new Date().toString(),
                                             role: "assistant",
                                             id,
                                        },
                                   })
                              );
                         }
                    }
               } else {
                    // Close the event source when the response is complete
                    responseComplete = true;
                    eventSource.close();
               }
          } catch (error) {
               console.error("Error parsing event data:", error);
               eventSource.close();

               // Error handling
               eventSource.addEventListener("error", (error) => {
                    console.error("EventSource error: ", error);
                    dispatch(
                         updateAssistantMessage({
                              chatId: chatId,
                              messageId: id,
                              message: {
                                   content: "Oops! Something went wrong while processing your request.",
                                   time: new Date().toString(),
                                   role: "assistant",
                                   id,
                              },
                         })
                    );
                    eventSource.close();
               });

               // Ensure the event source is closed if not completed
               eventSource.addEventListener("close", () => {
                    if (!responseComplete) {
                         eventSource.close();
                    }
               });

               // Cleanup function
               return () => {
                    eventSource.close();
               };
          }
     });

     return () => eventSource.close();
};

export const generateImageResponse = (
     messages: ChatMessagesType[],
     prompt: PromptType,
     chatId: string,
     dispatch: Dispatch
) => { }