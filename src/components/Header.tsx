import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Bars3BottomLeftIcon, CheckBadgeIcon } from "react-native-heroicons/solid"
import { RFValue } from 'react-native-responsive-fontsize'
import MetaAILogo from "../assets/logo_s.jpeg"
import CustomText from './CustomText'
import { clearChatMessages, selectChats, selectCurrentChatId, updateCurrentChatId } from '../store/slice/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import SideDrawer from './SideDrawer'

const Header = () => {
     const [isVisiable, setIsVisiable] = useState(false)
     const dispatch = useDispatch()

     const chats = useSelector(selectChats);
     const currentChatId = useSelector(selectCurrentChatId);
     const setCurrentChatId = (chatId: string) => {
          dispatch(updateCurrentChatId({ chatId }));
     };

     const handleclearChatMessages = async () => {
          dispatch(clearChatMessages({ chatId: currentChatId }))
     }

     return (
          <View style={styles.container}>
               <SafeAreaView>
                    <View style={styles.subContainer}>
                         <TouchableOpacity onPress={() => setIsVisiable(true)}>
                              <Bars3BottomLeftIcon size={RFValue(23)} color={"#fff"} />
                         </TouchableOpacity>

                         <View style={styles.flexRow}>
                              <Image source={MetaAILogo} style={styles.img} />
                              <View>
                                   <CustomText fontWight='bold'>
                                        Meta AI <CheckBadgeIcon color={"#27d366"} size={16} />
                                   </CustomText>
                                   <CustomText fontWight={500} opacity={0.75}>
                                        with Llama 3
                                   </CustomText>
                              </View>
                         </View>

                         <TouchableOpacity onPress={handleclearChatMessages}>
                              <CustomText>
                                   Clear
                              </CustomText>
                         </TouchableOpacity>
                    </View>
               </SafeAreaView>

               {/* open the side drawer */}
               {isVisiable &&
                    <SideDrawer
                         chats={chats}
                         isVisible={isVisiable}
                         currentChatId={currentChatId}
                         setCurrentChatId={setCurrentChatId}
                         onPressHide={() => setIsVisiable(false)}
                    />}
          </View>
     )
}

export default Header

const styles = StyleSheet.create({
     container: {
          padding: 20,
          backgroundColor: "rgba(20,25,46,1)",
          borderBottomWidth: 0.18,
          borderBottomColor: "rgba(62,62,63,1)"
     },
     subContainer: {
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          gap: 12
     },
     flexRow: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10
     },
     img: {
          height: 38,
          width: 38,
          borderRadius: 50
     },
})