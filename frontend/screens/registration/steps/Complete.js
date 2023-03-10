import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath, Circle } from 'react-native-svg';
import React, { useState } from 'react'
import { COLORS, FONTS } from "../../../constants";

var width = Dimensions.get('window').width - 40;

const Complete = (props) => {

const completeIcon = <Svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="90" cy="90" r="90" fill="rgba(117, 233, 187, 0.4)" />
<Path d="M59 87.6667L81.3333 110L121.333 70" stroke="white" stroke-width="5" stroke-linecap="round"/>
</Svg>


  return (
    <View style={styles.container}>
      <View>{ completeIcon }</View>
      <Text style={styles.title}>Well done! Your account is created successfully</Text>
      <Text style={styles.description}>Now let's move forward to create your digital NFT clone & store it on blockchain for </Text>
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.button} onPress={() => props.navigation.navigate("Home")}>
            <Text style={styles.buttonText}>Generate digital AI clone</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Complete

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    height: "100%",
  },
  title: {
    fontFamily: FONTS.preety,
    color: COLORS.white,
    fontSize: 24,
    lineHeight: 36,
    textAlign: "center",
    paddingTop: 20,
  },
  description: {
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    fontSize: 16,
    textAlign: "center"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.green,
    alignSelf: 'stretch',
    textAlign: 'center',
    width: width,
    marginLeft: 16,
},
buttonText: {
    fontFamily: FONTS.preety,
    color: COLORS.green,
    fontSize: 16
},
buttonWrapper: {
    position: 'absolute',
    bottom: 45,
},
})