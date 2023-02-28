import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Button, ActivityIndicator, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../constants"
import axios from "axios"
import { Audio } from 'expo-av'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height / 2.5;


const Edit = ({selected, image, result, setResult, achievements, otherHobbies, loading, setLoading}) => {

  const voices = [ 
    {name:"Amber", code:"en-US-AmberNeural", gender:"female"}, 
    {name:"Aria", code:"en-US-AriaNeural", gender:"female"}, 
    {name:"Cora", code:"en-US-CoraNeural", gender:"female"}, 
    {name:"Elizabeth", code:"en-US-ElizabethNeural", gender:"female"}, 
    {name:"Eric", code:"en-US-EricNeural", gender:"male"}, 
    {name:"Guy", code:"en-US-GuyNeural", gender:"male"}, 
    {name:"Tony", code:"en-US-TonyNeural", gender:"male"}, 
  ];

  const hobbies = selected.join(', ')
  const generateText = () => {
    setLoading(true);
    const apiKey = "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"
    const client = axios.create({
        headers: {
          Authorization: "Bearer " + apiKey,
        },
      });
      
      const params = {
        prompt: `Make a 4 sentence story about myself with an funny twist. My hobbies or hobby is ${hobbies}, ${otherHobbies} and my biggest achievement is ${achievements}`,
        model: "text-davinci-003",
        max_tokens: 100,
        temperature: 0,
      };
      
      client
        .post("https://api.openai.com/v1/completions", params)
        .then((result) => {
          setLoading(false);
          console.log(result.data.choices[0].text);
          setResult(result.data.choices[0].text);
        })
        .catch((err) => {
          console.log(err);
        });
    }
      useEffect(() => {
        generateText()
      }, []);

  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.title}>Your AI generated BIO</Text>
      <Text style={styles.transcript}>Based on your answers, our AI generated short description of your digital self. Edit it or leave as it is.</Text>
      <ScrollView style={styles.wrapperInner}>
        { loading ? <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color={COLORS.green} /></View> : <Text style={styles.textInputGenerated}>{result}</Text> }
      </ScrollView>
    </View>
  )
}

export default Edit

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(11, 11, 11, 1)"
  },
  container: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    marginTop: 75
  },
  image: {
    width: width,
    height: height,
  },
  wrapperInner: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    padding: 16,
    borderColor: "rgba(65, 65, 65, 1)",
    borderWidth: 1,
    borderRadius: 8,
    height: height / 1.6,
    width: width - 40,
  },
  textInputGenerated: {
    color: COLORS.white,
    fontSize: 18,
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
  }
})