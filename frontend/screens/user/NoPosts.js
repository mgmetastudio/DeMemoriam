import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../constants'
import Svg, { Path } from 'react-native-svg'

const plus = <Svg style={{marginRight: 10}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M8.17886 1.78746C8.01715 1.78751 7.86216 1.8517 7.74781 1.96605C7.63351 2.08035 7.56927 2.23539 7.56927 2.39705L7.56927 7.39077L2.57555 7.39077C2.35798 7.39107 2.157 7.50727 2.04825 7.69578C1.93957 7.88424 1.93956 8.11645 2.04825 8.30491C2.15699 8.49342 2.35798 8.60962 2.57555 8.60992L7.56927 8.60992L7.56927 13.6036C7.56957 13.8212 7.68577 14.0222 7.87428 14.1309C8.06274 14.2396 8.29495 14.2396 8.48341 14.1309C8.67192 14.0222 8.78812 13.8212 8.78842 13.6036L8.78842 8.60992L13.7821 8.60992C13.9997 8.60962 14.2007 8.49341 14.3094 8.30491C14.4181 8.11644 14.4181 7.88424 14.3094 7.69578C14.2007 7.50726 13.9997 7.39106 13.7821 7.39077H8.78842L8.78842 2.39705C8.78842 2.2354 8.72418 2.08035 8.60988 1.96605C8.49553 1.8517 8.34049 1.78746 8.17883 1.78746L8.17886 1.78746Z" fill="#75E9BB"/>
</Svg>


const NoPosts = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>No posts found</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Upload")}>
            <Text style={styles.buttonText}>{ plus } Upload first story</Text>
        </Pressable>
    </View>
  )
}

export default NoPosts

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    text: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: COLORS.white,
        textAlign: "center",
    },
    button: {
        borderColor: COLORS.green,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    buttonText: {
        fontFamily: FONTS.preety,
        color: COLORS.green,
        fontSize: 16,
    }
})