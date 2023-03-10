import { StyleSheet, Text, View, Image, Dimensions, TextInput, Pressable, Alert, Button } from 'react-native'
import React, {useState} from 'react'
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'

var width = Dimensions.get('window').width;

const VideoPlayback = ({animatedVideo}) => {
  return (
        <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: animatedVideo,
          },
        }}
        slider={{
          visible: false,
        }}
        fullscreen={{
          visible: false,
        }}
        timeVisible={false}
        style={{ height: width, width: width }}
      />
  )
}

export default VideoPlayback

const styles = StyleSheet.create({})