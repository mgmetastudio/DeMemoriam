import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import React, { useState } from 'react'
import { COLORS, FONTS } from "../../../constants";

const UploadNewStory = () => {

  const [achievements, setAchievements] = useState('');

  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
          <Text style={styles.title}>Let’s go back, to the times {"\n"}
           when you were kid ...</Text>
      </View>
      <View style={styles.logo}>
            <Text style={styles.title2}>What is your hobby</Text>
      </View>
      <View style={styles.inputContainer}>
      </View>
      <View>
            <Text style={styles.title2}>What is your biggest achievements</Text>
            <TextInput
              style={styles.input}
              onChangeText={setAchievements}
              value={achievements}
              placeholder="Country"
            />
      </View>
    </View>
  )
}

export default UploadNewStory

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
      marginLeft: 24,
      marginRight: 24,
  },
  logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      textAlign: "center"
  },
  title: {
      fontSize: 18,
      fontFamily: FONTS.preety,
      color: COLORS.white,
      textAlign: "center",
  },
  title2: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 15
},
  paragraph: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 7
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(65, 65, 65, 1)",
    marginBottom: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 7
  },
  input: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    borderWidth: 1,
    borderColor: "rgba(65, 65, 65, 1)",
    marginBottom: 7,
    padding: 10,
    borderRadius: 2
  },
  inputContainer: {
    paddingTop: 25,
    paddingBottom: 25
  }
})