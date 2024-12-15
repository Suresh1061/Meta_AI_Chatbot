import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MessageInput from './MessageInput';
import SendButton from './SendButton';
import uuid from 'react-native-uuid';
import { ChatMessagesType, CreateNewChat, selectCurrentChatId, updateCurrentChatId } from '../store/slice/chatSlice';
import { addChat } from '../utils/addChat';

type InputAndButtonFieldProps = {
     setHeightOfMessageBox: (height: number) => void;
     heightOfMessageBox: number;
     messages: ChatMessagesType[]
};

const InputAndButtonField: React.FC<InputAndButtonFieldProps> = ({ setHeightOfMessageBox, heightOfMessageBox, messages }) => {
     const [message, setMessage] = useState('');
     const [isTyping, setIsTyping] = useState(false)
     const inputRef = useRef(null);

     const dispatch = useDispatch();
     const currentChatId = useSelector(selectCurrentChatId);
     const length = messages.length

     const handleSendMessage = () => {
          if (currentChatId) {
               addChat(currentChatId, length, message, messages, dispatch);
          } else {
               const chatId = uuid.v4().toString();
               dispatch(updateCurrentChatId({ chatId }))
               dispatch(
                    CreateNewChat({
                         chatId,
                         messages: [],
                         summery: 'New Chat!',
                    })
               );
               addChat(chatId, length, message, messages, dispatch);
          }
          setMessage('');
          setIsTyping(false);
     };

     const handleContentSizeChange = (event: any) => {
          setHeightOfMessageBox(event.nativeEvent.contentSize.height);
     };

     return (
          <KeyboardAvoidingView
               style={styles.container}
               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
          >
               <View style={styles.subContainer}>
                    <MessageInput
                         message={message}
                         isTyping={isTyping}
                         setMessage={setMessage}
                         setIsTyping={setIsTyping}
                         handleContentSizeChange={handleContentSizeChange}
                         inputRef={inputRef}
                    />
                    <SendButton
                         isTyping={isTyping}
                         handleSendMessage={handleSendMessage}
                    />
               </View>
          </KeyboardAvoidingView>
     );
};

export default InputAndButtonField;

const styles = StyleSheet.create({
     container: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 10,
     },
     subContainer: {
          flexDirection: 'row',
          alignItems: 'center',
     },
});
