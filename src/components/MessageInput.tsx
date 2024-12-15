import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

type MessageInputProps = {
     message: string;
     setMessage: (text: string) => void;
     setIsTyping: (typing: boolean) => void;
     handleContentSizeChange: (event: any) => void;
     inputRef: React.RefObject<TextInput>;
     isTyping: boolean;
};

const MessageInput: React.FC<MessageInputProps> = ({
     message,
     setMessage,
     setIsTyping,
     handleContentSizeChange,
     inputRef,
     isTyping,
}) => {
     const handleChangeText = (text: string) => {
          setIsTyping(!!text.trim());
          setMessage(text);
     };

     return (
          <View
               style={[
                    styles.inputContainer,
                    isTyping ? styles.inputWithButton : styles.inputFullWidth,
               ]}
          >
               <TextInput
                    // ref={inputRef}
                    editable
                    multiline // Allows multi-line input
                    placeholder="Message"
                    style={styles.inputBox}
                    placeholderTextColor="#7f8c8d"
                    value={message}
                    onChangeText={handleChangeText}
                    onContentSizeChange={handleContentSizeChange} // Dynamically adjusts container size based on input content
               />
          </View>
     );
};

export default MessageInput;

const styles = StyleSheet.create({
     inputContainer: {
          backgroundColor: '#232626',
          borderRadius: 20,
          alignItems: 'center',
          flexDirection: 'row',
     },
     inputWithButton: {
          width: "86%",
     },
     inputFullWidth: {
          flex: 1,
     },
     inputBox: {
          flex: 1,
          fontSize: RFValue(14),
          color: '#fff',
          marginHorizontal:15
     },
});
