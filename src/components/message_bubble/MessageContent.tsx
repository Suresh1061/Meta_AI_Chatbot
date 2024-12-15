import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { ChatMessagesType } from '../../store/slice/chatSlice';
import dayjs from 'dayjs';
import TickIcon from "../assets/tick.png"
import MarkdownDisplay from 'react-native-markdown-display';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import LoadingDots from '../LoadingDots';

type Props = {
     message: ChatMessagesType;
     isMyMessage: boolean;
}

const MessageContent: React.FC<Props> = ({ message, isMyMessage }) => {
     if (message?.isLoading) {
          return <LoadingDots />;
     }

     if (message?.imageUri) {
          return <Image source={{ uri: message.imageUri }} style={styles.img} />;
     }

     return (
          <MarkdownDisplay
               style={{
                    body: {
                         ...styles.messageText,
                         left: isMyMessage ? 10 : 0,
                         marginVertical: 0,
                         marginHorizontal: 0,
                    },
                    link: { color: "lightblue" },
                    blockquote: { color: "white", backgroundColor: "#1d211e", borderRadius: 4 },
                    table: { borderColor: 'white' },
                    tr: { borderColor: "white" },
                    code_inline: { backgroundColor: "#1d211e", color: "white", borderRadius: 5 },
                    fence: { backgroundColor: "#1d211e", color: "white", borderRadius: 5 },
               }}
          >
               {message.content}
          </MarkdownDisplay>
     );
};

export default MessageContent;


const styles = StyleSheet.create({
     messageText: {
          fontSize: RFValue(11.4),
          color: "#fff",
          marginBottom: 15,
          marginRight: 15,
     },
     img: {
          height: RFPercentage(20),
          width: RFPercentage(35),
          resizeMode: "cover",
          left: -5,
          aspectRatio: 4 / 4,
          borderRadius: 20,
     },
})