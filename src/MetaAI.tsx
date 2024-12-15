import { ImageBackground, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import wspBG from './assets/w_bg.png';
import Header from './components/Header';
import Chat from './components/Chat';
import InputAndButtonField from './components/InputAndButtonField';
import { useSelector } from 'react-redux';
import { selectChatMessaages, selectChats } from './store/slice/chatSlice';
import dayjs from 'dayjs';

const MetaAI = () => {
     const [heightOfMessageBox, setHeightOfMessageBox] = useState(0);
     const messages = useSelector(selectChatMessaages);
     // console.log("new" , dayjs(new Date().toString()).format('hh:mm a'))

     const chats = useSelector(selectChats)
     console.log(chats)
     return (
          <>
               <ImageBackground
                    source={wspBG}
                    style={styles.container}
               >
                    <Header />
                    <Chat
                         heightOfMessageBox={heightOfMessageBox}
                         messages={messages}
                    />
                    <InputAndButtonField
                         setHeightOfMessageBox={setHeightOfMessageBox}
                         heightOfMessageBox={heightOfMessageBox}
                         messages={messages}
                    />
               </ImageBackground>
          </>
     );
};

export default MetaAI;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          resizeMode: "cover"
     }
});
