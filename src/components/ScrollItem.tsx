import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import uuid from 'react-native-uuid';
import { RFValue } from 'react-native-responsive-fontsize';
import { CreateNewChat, selectCurrentChatId, updateCurrentChatId } from '../store/slice/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from '../utils/addChat';

type Props = {
     item: string;
}

const ScrollItem: React.FC<Props> = ({ item }) => {
     const dispatch = useDispatch();
     const currentChatId = useSelector(selectCurrentChatId);

     const handleSubmit = () => {
          if (currentChatId) {
               addChat(currentChatId, 0, item, [], dispatch);
          } else {
               const chatId = uuid.v4().toString();
               dispatch(updateCurrentChatId({ chatId }))
               dispatch(CreateNewChat({ chatId, messages: [], summery: item }))
               addChat(chatId, 0, item, [], dispatch);
          }
     }

     return (
          <TouchableOpacity key={uuid.v4()} style={styles.touchableItem} onPress={handleSubmit}>
               <Text style={styles.touchableText}>{item}</Text>
          </TouchableOpacity>
     )
}

export default ScrollItem

const styles = StyleSheet.create({
     touchableItem: {
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: 20,
          padding: 10,
          marginHorizontal: 5,
     },
     touchableText: {
          fontSize: RFValue(12),
          color: "white",
     },
})