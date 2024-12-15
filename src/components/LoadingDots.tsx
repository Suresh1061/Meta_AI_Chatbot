import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const LoadingDots = () => {
     const [animatedValues] = useState(
          Array.from({ length: 3 }, () => new Animated.Value(1))
     )

     const startAnimation = () => {
          Animated.loop(
               Animated.stagger(
                    100,
                    animatedValues.map((val) =>
                         Animated.sequence([
                              Animated.timing(val, {
                                   toValue: 0.5,
                                   duration: 500,
                                   easing: Easing.linear,
                                   useNativeDriver: true
                              }),
                              Animated.timing(val, {
                                   toValue: 1,
                                   duration: 500,
                                   easing: Easing.linear,
                                   useNativeDriver: true
                              })
                         ])
                    )
               )
          ).start()
     }

     const resetAnimation = () => {
          animatedValues.forEach(val => val.setValue(1))
     }

     useEffect(() => {
          startAnimation()

          return () => resetAnimation()
     }, [])
     return (
          <View style={styles.container}>
               {animatedValues.map((animatedValue, index) => (
                    <Animated.View
                         key={index}
                         style={[
                              styles.dot,
                              {
                                   transform: [{ scale: animatedValue }],
                                   marginRight:4
                              }]}
                    />
               ))}
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 20,
          alignSelf: "center",
          height: 14
     },
     dot: {
          height: RFValue(5),
          width: RFValue(5),
          borderRadius: 50,
          backgroundColor: "gray"
     }
})

export default LoadingDots