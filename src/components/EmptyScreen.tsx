import { Animated, Easing, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import MetaAILogo from "../assets/logo_t.png";
import CustomText from './CustomText';
import { exampleData } from '../utils/data';
import uuid from 'react-native-uuid';
import ScrollItem from './ScrollItem';

const EmptyScreen = () => {
     const rotation = useRef(new Animated.Value(0)).current;
     const fadeAnim = useRef(new Animated.Value(1)).current;
     const [isKeyboardVisible, setKeyboardVisible] = useState(false);

     useEffect(() => {
          const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
               setKeyboardVisible(true);
               Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
               }).start();
          });

          const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
               setKeyboardVisible(false);
               Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
               }).start();
          });

          return () => {
               showSubscription.remove();
               hideSubscription.remove();
          };
     }, [fadeAnim]);

     useEffect(() => {
          const infiniteRotation = () => {
               rotation.setValue(0);
               Animated.timing(rotation, {
                    toValue: 1,
                    duration: 5000,
                    easing: Easing.linear,
                    useNativeDriver: true,
               }).start(() => infiniteRotation());
          };

          infiniteRotation();

          return () => rotation.stopAnimation();
     }, [rotation]);

     const rotate = rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
     });

     return (
          <View style={styles.container}>
               {/* Animated logo rotation */}
               <View style={styles.imgContainer}>
                    <Animated.Image
                         source={MetaAILogo}
                         style={[styles.img, { transform: [{ rotate }] }]}
                    />
               </View>
               <CustomText size={RFValue(22)}>Ask Meta Ai Anything</CustomText>

               {/* Smooth fade-in and fade-out of ScrollView */}
               <Animated.View style={{ opacity: fadeAnim }}>
                    {!isKeyboardVisible && (
                         <ScrollView
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              centerContent={true}
                              style={styles.scrollContainer}
                              contentContainerStyle={styles.scrollContent}
                         >
                              <View>
                                   <View key={uuid.v4()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                                        {exampleData.slice(0, 7).map((item) => <ScrollItem item={item} key={uuid.v4()} />)}
                                   </View>

                                   <View key={uuid.v4()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                                        {exampleData.slice(7, 14).map((item) => <ScrollItem item={item} key={uuid.v4()} />)}
                                   </View>

                                   <View key={uuid.v4()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                                        {exampleData.slice(14, 21).map((item) => <ScrollItem item={item} key={uuid.v4()} />)}
                                   </View>
                              </View>
                         </ScrollView>
                    )}
               </Animated.View>
          </View>
     );
};

export default EmptyScreen;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     imgContainer: {
          height: RFValue(150),
          width: RFValue(150),
     },
     img: {
          height: "100%",
          width: "100%",
          resizeMode: "cover",
     },
     scrollContainer: {
          marginTop: 20,
          maxHeight: RFValue(120),
     },
     scrollContent: {
          alignItems: "center",
     },
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
});
