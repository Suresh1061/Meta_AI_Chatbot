import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { PaperAirplaneIcon } from 'react-native-heroicons/solid';

type SendButtonProps = {
     isTyping: boolean;
     handleSendMessage: () => void;
};

const SendButton: React.FC<SendButtonProps> = ({ isTyping, handleSendMessage }) => {
     const animationValue = useRef(new Animated.Value(0)).current;


     useEffect(() => {
          Animated.timing(animationValue, {
               toValue: isTyping ? 1 : 0,
               duration: 300,
               useNativeDriver: true,
          }).start();
     }, [isTyping]);

     const animatedStyle = {
          opacity: animationValue,
          transform: [
               {
                    scale: animationValue.interpolate({
                         inputRange: [0, 1],
                         outputRange: [0.8, 1],
                    }),
               },
          ],
     };

     return (
          <Animated.View style={[styles.sendButtonWrapper, animatedStyle]}>
               <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSendMessage}
                    activeOpacity={0.8}
               >
                    <PaperAirplaneIcon color="#000" size={20} />
               </TouchableOpacity>
          </Animated.View>
     );
};

export default SendButton;

const styles = StyleSheet.create({
     sendButtonWrapper: {
          position: 'absolute',
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: 45,
          height: 45,
     },
     sendButton: {
          backgroundColor: '#22c063',
          borderRadius: 25,
          width: 45,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 4, 
     },
});
