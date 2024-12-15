import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import dayjs from 'dayjs';
import TickIcon from "../../assets/tick.png"
import { RFValue } from 'react-native-responsive-fontsize';


type Props = {
     isMyMessage: boolean;
     isMessageRead: boolean;
     time: string;
}

const MessageStatus: React.FC<Props> = ({ isMyMessage, isMessageRead, time }) => {
     return (
          <View style={styles.timeAndReadContainer}>
               <Text style={styles.timeText}>{dayjs(time).format('hh:mm a')}</Text>
               {isMyMessage && (
                    <Image
                         tintColor={isMessageRead ? '#53a6fd' : '#8aa69b'}
                         source={TickIcon}
                         style={{ width: 15, height: 15 }}
                    />
               )}
          </View>
     );
};


export default MessageStatus

const styles = StyleSheet.create({
     timeAndReadContainer: {
          flexDirection: "row",
          alignItems: 'center',
          position: "absolute",
          bottom: 4,
          paddingHorizontal: 10,
          gap: 2
     },
     timeText: {
          fontSize: RFValue(10),
          fontWeight: '400',
          color: "#8aa69b"
     }
})