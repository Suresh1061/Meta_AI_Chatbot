import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ChatMessagesType } from '../../store/slice/chatSlice';
import MessageArrow from './MessageArrow';
import MessageContent from './MessageContent';
import MessageStatus from './MessageStatus';

type Props = {
     message: ChatMessagesType;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
     const isMyMessage = message.role === 'user';
     const isMessageRead = message.isMessageRead || false;

     return (
          <View
               style={{
                    ...styles.messageContainer,
                    maxWidth: isMyMessage ? "80%" : "92%",
                    alignSelf: isMyMessage ? "flex-end" : "flex-start",
                    backgroundColor: isMyMessage ? "#154d37" : "#232626",
                    borderTopLeftRadius: isMyMessage ? 5 : 0,
                    borderTopRightRadius: isMyMessage ? 0 : 5,
               }}
          >
               {!isMyMessage && <MessageArrow isMyMessage={isMyMessage} />}
               <MessageContent message={message} isMyMessage={isMyMessage} />
               {isMyMessage && <MessageArrow isMyMessage={isMyMessage} />}
               <MessageStatus isMyMessage={isMyMessage} isMessageRead={isMessageRead} time={message.time} />
          </View>
     );
};


export default MessageBubble

const styles = StyleSheet.create({
     messageContainer: {
          minWidth: "24%",
          marginVertical: 8,
          marginHorizontal: 10,
          flexDirection: "row",
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowRadius: 5,
          shadowOpacity: 0.2,
          elevation: 10,
          borderRadius: 10
     }
})
