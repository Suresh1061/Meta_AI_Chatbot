import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import MessageBubble from './message_bubble/MessageBubble';
import useKeyboardOffsetHeight from '../utils/useKeyboardOffsetHeight';
import getMessageHeightOffset from '../utils/getMessageOffsetHeight';
import { ChatMessagesType } from '../store/slice/chatSlice';
import EmptyScreen from './EmptyScreen';

type Props = {
     heightOfMessageBox: number;
     messages:ChatMessagesType[]
};

const windowHeight = Dimensions.get('window').height;

const Chat: React.FC<Props> = ({ heightOfMessageBox, messages }) => {
     const keyboardOffsetHeight = useKeyboardOffsetHeight();

     const reversedMessages = useMemo(() => [...messages].reverse(), [messages]);

     const calculatedHeight =
          windowHeight * 0.85 -
          keyboardOffsetHeight  -
          getMessageHeightOffset(heightOfMessageBox, windowHeight);


     return (
          <View style={{ height: calculatedHeight}}>
               {messages.length === 0 ? (
                    <EmptyScreen />
               ) : (
                    <FlashList
                         data={reversedMessages}
                         inverted
                         keyExtractor={(item) => item.id.toString()}
                         estimatedItemSize={50} 
                         indicatorStyle="black"
                         renderItem={({ item }) => <MessageBubble message={item} />}
                    />
               )}
          </View>
     );
};

export default Chat;
