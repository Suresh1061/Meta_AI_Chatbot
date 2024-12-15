import { SafeAreaView, StyleSheet, Text, View, Image, Touchable, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { addMessage, ChatType, clearAllChats, CreateNewChat, deleteChat } from '../store/slice/chatSlice';
import Modal from "react-native-modal"
import CustomText from './CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { TrashIcon } from 'react-native-heroicons/solid';
import { useDispatch } from 'react-redux';
import uuid from "react-native-uuid";

type Props = {
     chats: ChatType[];
     isVisible: boolean;
     currentChatId: string;
     setCurrentChatId: (chatId: string) => void;
     onPressHide: () => void;
}

const SideDrawer: React.FC<Props> = ({
     chats,
     isVisible,
     currentChatId,
     setCurrentChatId,
     onPressHide
}) => {
     const dispatch = useDispatch()

     const handleAddNewChat = async () => {
          dispatch(CreateNewChat({
               chatId: uuid.v4(),
               messages: [],
               summery: "New Chat!",
          }))
     }

     const handleClearAllChats = async () => {
          dispatch(clearAllChats())
     }

     const handleDeleteChatById = async (chatId: string) => {
          dispatch(deleteChat({ chatId }))
     }

     const RenderChats = ({ item }: { item: ChatType }) => {
          return (
               <TouchableOpacity
                    onPress={() => {
                         setCurrentChatId(item.id)
                         onPressHide()
                    }}
                    style={[
                         styles.chatBtn,
                         {
                              backgroundColor: currentChatId === item.id ? "#041e49" : "#131314"
                         }
                    ]}
               >
                    <CustomText
                         // numberOfLines={1}
                         style={{ width: "80%"}}
                         size={RFValue(11)}
                         fontWight="500"
                    >
                         {item.summery}
                    </CustomText>
                    <TouchableOpacity
                         style={styles.trashIcon}
                         onPress={() => { handleDeleteChatById(item.id) }}
                    >
                         <TrashIcon color="#ef4444" size={RFValue(14)} />
                    </TouchableOpacity>
               </TouchableOpacity>
          )
     }

     return (
          <Modal
               style={styles.bottomModalView}
               isVisible={isVisible}
               backdropColor='black'
               backdropOpacity={0.5}
               animationIn={"slideInLeft"}
               animationOut={"slideOutLeft"}
               onBackdropPress={onPressHide}
               onBackButtonPress={onPressHide}
          >
               <SafeAreaView>
                    <View style={styles.modalContainer}>
                         <View style={{ width: "100%", height: "100%" }}>
                              <View style={styles.header}>
                                   <View style={styles.flexRow}>
                                        <Image
                                             source={require("../assets/logo_t.png")}
                                             style={{ width: 30, height: 30 }}
                                        />
                                        <CustomText size={RFValue(15)} opacity={0.8} fontWight="600">
                                             All Chats
                                        </CustomText>
                                   </View>
                                   <TouchableOpacity onPress={onPressHide}>
                                        <XCircleIcon color="#ccc" size={RFValue(20)} />
                                   </TouchableOpacity>
                              </View>

                              {/* create new chat */}
                              <TouchableOpacity style={styles.newChat} onPress={handleAddNewChat}>
                                   <CustomText size={RFValue(10)}>
                                        + Add new chat
                                   </CustomText>
                              </TouchableOpacity>

                              <CustomText style={{ margin: 10, fontSize: RFValue(12) }}>
                                   Recent
                              </CustomText>

                              <View style={{ height: "60%" }}>
                                   <FlatList
                                        data={[...chats].reverse()}
                                        renderItem={({ item }) => <RenderChats item={item} />}
                                        keyExtractor={(item) => item.id}
                                        contentContainerStyle={{
                                             paddingHorizontal: 5,
                                             paddingVertical: 10,
                                        }}
                                   />
                              </View>

                              <TouchableOpacity style={styles.clearAllChat} onPress={handleClearAllChats}>
                                   <CustomText fontWight="500" size={RFValue(10)}>
                                        Clear All Chats
                                   </CustomText>

                              </TouchableOpacity>
                         </View>

                    </View>
               </SafeAreaView>
          </Modal>
     )
}

export default SideDrawer

const styles = StyleSheet.create({
     bottomModalView: {
          justifyContent: "flex-end",
          width: "70%",
          margin: 10
     },
     modalContainer: {
          backgroundColor: "#171717",
          borderRadius: 20,
          overflow: "hidden",
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
     },
     header: {
          padding: 20,
          borderBottomWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "gray"
     },
     flexRow: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5
     },
     newChat: {
          backgroundColor: "#272a2c",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
          width: "60%",
          margin: 10,
          alignSelf: "center"
     },
     clearAllChat: {
          backgroundColor: "#ef4444",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          margin: 20
     },
     chatBtn: {
          paddingHorizontal: 12,
          paddingVertical: 5,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 8
     },
     trashIcon: {
          padding: 5,
          backgroundColor: "white",
          borderRadius: 20,
     }
})