import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MessageArrow: React.FC<{ isMyMessage: boolean }> = ({ isMyMessage }) => {
     if (isMyMessage) {
          return <View style={styles.rightMessageArrow} />;
     }
     return <View style={styles.leftMessageArrow} />;
};


export default MessageArrow

const styles = StyleSheet.create({
     leftMessageArrow: {
          height: 0,
          width: 0,
          borderLeftWidth: 10,
          borderLeftColor: "transparent",
          borderTopColor: "#232626",
          borderTopWidth: 10,
          alignSelf: "flex-start",
          borderRightColor: "black",
          right: 10,
          bottom: 0
     },
     rightMessageArrow: {
          height: 0,
          width: 0,
          position: "absolute",
          borderRightColor: "transparent",
          borderTopColor: "#154d37",
          borderRightWidth: 10,
          borderTopWidth: 10,
          alignSelf: "flex-start",
          right: -8,
          top: 0
     },
})