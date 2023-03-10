import { StyleSheet, Text, View, Image, Dimensions, TextInput, Pressable, Alert, Button, ActivityIndicator, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../../constants";
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import axios from "axios"
import PopupSuccess from "../PopupSuccess"
import VideoPlayback from "./VideoPlayback"

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height / 2.5;
var horizontalPosition = (Dimensions.get('window').width /2) - 8;
var verticalPosition = (Dimensions.get('window').height / 5) - 8;
const play = <Svg style={{marginLeft: 3}} width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M14.75 9L0.124999 17.4437L0.125 0.556252L14.75 9Z" fill="#75E9BB"/>
</Svg>

const preview = ({result, modalVisible, setModalVisible, navigation, animatedVideo, loading, animatedImage, setAnimatedImage, setAnimatedVideo, uploadedImage }) => {

  return (
    <View style={styles.wrapper}>
        <View style={styles.videoContainer}>
            {loading ? <View style={styles.container}><ActivityIndicator size="large" color={COLORS.green} /></View> : <VideoPlayback animatedVideo={animatedVideo} />}
        </View>
        <Text style={styles.transcript}>Your AI generated BIO</Text>
        <ScrollView style={styles.wrapperInner}>
          <Text style={styles.textInputGenerated}>{result}</Text>
        </ScrollView>
        <PopupSuccess modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />
  </View>
  )
}

export default preview

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "rgba(11, 11, 11, 1)",
      },
      image: {
        width: width,
        height: height,
      },
      container: {
        textAlign: "center",
        width: "100%",
        height: "100%",
        marginTop: 75
      },
      wrapperInner: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        padding: 16,
        borderColor: "rgba(65, 65, 65, 1)",
        borderWidth: 1,
        borderRadius: 8,
        height: height / 2 + 35
      },
      textInputGenerated: {
        color: COLORS.white,
        fontSize: 16,
      },
      title: {
        color: COLORS.white,
        paddingTop: 20,
        paddingBottom: 0,
        fontSize: 16,
        paddingLeft: 16,
      },
      transcript: {
        color: COLORS.gray,
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 14,
        paddingLeft: 16,
      },
      transcriptShortDescription: {
        color: COLORS.gray,
        paddingBottom: 10,
        fontSize: 14,
        paddingLeft: 16,
      },
      wrapperUser: {
        backgroundColor: "rgba(20, 20, 20, 1)",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(65, 65, 65, 1)",
        display: "flex",
        alignContent: "center",
        flexDirection: "row",
        padding: 12
      },
      profileImage: {
        width: 35,
        height: 35,
        borderRadius: 20
      },
      userName: {
        fontFamily: FONTS.medium,
        color: COLORS.white,
      },
      postStatus: {
        color: COLORS.gray
      },
      userTexts: {
        marginLeft: 12
      },
      play: {
        position: "absolute", 
        zIndex: 3, 
        right: horizontalPosition, 
        top: verticalPosition,
        backgroundColor: "rgba(2, 3, 4, 0.5)",
        width: 40,
        height: 40,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      videoContainer: {
        height: width,
      },
})