import { StyleSheet, Text, View, Image, Dimensions, TextInput, Pressable, Alert, Button } from 'react-native'
import React, {useState} from 'react'
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'

var width = Dimensions.get('window').width;

const VideoPlayback = () => {
  return (
        <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: 'https://d-id-talks-prod.s3.us-west-2.amazonaws.com/google-oauth2%7C100126164589577254691/tlk_4tKSU3dy_hYYrGqLdKo1l/d6a957f1d8045c9c973c12bf5968326f.mp4?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1677653854&Signature=9j3Rq2QAskkhfcU7uvagYqu7A0c%3D',
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