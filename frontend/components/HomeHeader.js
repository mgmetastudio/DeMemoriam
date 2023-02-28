import { View, SafeAreaView, FlatList, Text, StyleSheet, Image, Pressable, Alert, Dimensions } from "react-native";
import React from 'react'
import { COLORS, FONTS } from "../constants";
import Svg, { Path } from 'react-native-svg';

const HomeHeader = (props) => {

  const stepBack = () => {
    if(props.step < 2) {
      props.navigation.navigate("Home")
    } else {
      props.setStep(props.step - 1);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.icon} onPress={() => stepBack()}>
        <View style={styles.svgWrapper}>
          <Svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M9 1L2 8L9 15" stroke="#54595D" stroke-width="2" stroke-linecap="round"/>
          </Svg>
        </View>
      </Pressable>
      <Text style={styles.text}>{props.step < 5 ? "Registration" : props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(11, 11, 11, 0.8)",
    color: COLORS.white,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(65, 65, 65, 1)",
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 2,
    width: 50,
    height: 50,
  },
  svgWrapper: {
    width: 40,
    height: 40,
  }

});

export default HomeHeader