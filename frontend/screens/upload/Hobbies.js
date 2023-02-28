import { View, Text, StyleSheet, Pressable, TextInput, Dimensions } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from "../../constants";

var width = Dimensions.get('window').width - 40;

const Hobbies = ({selected, hobbies, setAchievements, setOtherHobbies, achievements, otherHobbies, handleSelectItem}) => {
  return (
    <View style={styles.wrapper}>
    <View style={styles.logo}>
        <Text style={styles.title}>Answer few questions to {"\n"}
        generate your AI profile.</Text>
    </View>
    <View style={styles.logo}>
            <Text style={styles.title2}>What is your hobby</Text>
    </View>
    <View style={styles.list}>
        {hobbies.map((x, key) => (
            <Pressable key={key} style={selected.filter(selected => selected.includes(x)).length > 0 ? styles.listItemActive : styles.listItem} onPress={() => handleSelectItem(key, x)}>
                <Text style={selected.filter(selected => selected.includes(x)).length > 0 ? styles.listTextActive : styles.listText}>{x}</Text>
            </Pressable>
        ))}
    </View>
    <View>
    { selected.filter(selected => selected.includes('other..')).length > 0 ?
        <TextInput
            style={styles.input}
            onChangeText={setOtherHobbies}
            value={otherHobbies}
            placeholder="Other"
            placeholderTextColor="rgba(155, 155, 155, 1)"
        /> : null }
        <TextInput
            style={styles.input}
            onChangeText={setAchievements}
            value={achievements}
            placeholder="Greatest achievement"
            placeholderTextColor="rgba(155, 155, 155, 1)"
        />
    </View>
</View>
  )
}

export default Hobbies

const styles = StyleSheet.create({
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
        fontSize: 26,
        fontFamily: FONTS.preety,
        color: COLORS.white,
        textAlign: "center",
    },
    title2: {
      fontSize: 16,
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
    continue: {
      position: 'absolute',
      bottom: 45,
      marginLeft: 20,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: COLORS.green,
      padding: 10,
      width: width,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    continueText: {
      color: COLORS.green,
      fontFamily: FONTS.preety,
      textAlign: "center",
    },
    button: {
      borderWidth: 1,
      borderColor: "rgba(65, 65, 65, 1)",
      marginBottom: 7,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      fontSize: 16,
      fontFamily: FONTS.regular,
      color: COLORS.gray,
      borderWidth: 1,
      borderColor: "rgba(65, 65, 65, 1)",
      marginBottom: 7,
      padding: 10,
      borderRadius: 2,
      marginBottom: 30,
    },
    
    list: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      paddingBottom: 12,
    },
    listItem: {
      color: COLORS.gray,
      borderWidth: 1,
      fontSize: 15,
      borderColor: COLORS.gray,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 15,
      paddingRight: 15,
      margin: 5,
      borderRadius: 15,
      flexGrow: 1,
      textAlign: "center",
      textTransform: "capitalize",
    },
    listItemActive: {
      color: COLORS.green,
      borderWidth: 1,
      fontSize: 15,
      borderColor: COLORS.green,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 15,
      paddingRight: 15,
      margin: 5,
      borderRadius: 15,
      flexGrow: 1,
      textAlign: "center",
      textTransform: "capitalize",
    },
    listText: {
      color: COLORS.gray,
      fontFamily: FONTS.regular,
      textAlign: "center",
      textTransform: "capitalize",
    },
    listTextActive: {
        color: COLORS.green,
        fontFamily: FONTS.regular,
        textAlign: "center",
        textTransform: "capitalize",
      },
  })