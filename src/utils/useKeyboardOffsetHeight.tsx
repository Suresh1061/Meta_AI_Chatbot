import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyboardOffsetHeight() {
     const [keyboardOffsetHeight,setKeyboardOffsetHeight] = useState(0);

     useEffect(() => {
          //for android
          const keyboardWillAndroidShowListener = Keyboard.addListener(
               "keyboardDidShow",
               (e) => {
                    setKeyboardOffsetHeight(e.endCoordinates.height);
               }
          )

          const keyboardWillAndroidHiddenListener = Keyboard.addListener(
               "keyboardDidHide",
               () => {
                    setKeyboardOffsetHeight(0)
               }
          )

          //for ios
          const keyboardWillIosShowListener = Keyboard.addListener(
               "keyboardWillShow",
               (e) => {
                    setKeyboardOffsetHeight(e.endCoordinates.height);
               }
          )

          const keyboardWillIosHiddenListener = Keyboard.addListener(
               "keyboardWillHide",
               () => {
                    setKeyboardOffsetHeight(0)
               }
          )

          return ()=>{
               keyboardWillAndroidShowListener.remove();
               keyboardWillAndroidHiddenListener.remove();
               keyboardWillIosShowListener.remove();
               keyboardWillIosHiddenListener.remove();
          }
     },[])

     return keyboardOffsetHeight
}