import { View, SafeAreaView, FlatList, Text, StyleSheet, Image, Pressable, Alert, Dimensions } from "react-native";
import { COLORS, FONTS } from "../constants";

import React from 'react'

var width = Dimensions.get('window').width - 40;

const ContinueButton = (props) => {

   const pressHandler = () => {
        props.navigation.push('Feed');
    }

  return (
    props.step !== 8 ?
    <View style={styles.buttonWrapper}>
        <Pressable style={styles.button} onPress={() => props.setStep(props.step + 1)}>
            <Text style={styles.buttonText}>
                {props.step == 1 ? "Join now" : props.step == 7 ? "Continue to preview" : "Continue"}</Text>
        </Pressable>
    </View> :
    <View style={styles.buttonWrapper2}>
        <Pressable style={styles.button2} onPress={pressHandler}>
            <Text style={styles.buttonText}>Mint NFT</Text>
        </Pressable>
        <Pressable style={styles.button3} onPress={() => Alert.alert('Popup saved to gallery')}>
            <Text style={styles.buttonText2}>Save video</Text>
            <Text style={styles.buttonTextSecondary}>Without minting</Text>
        </Pressable>
    </View>
  )
}

export default ContinueButton

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 32,
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
    buttonText2: {
        fontFamily: FONTS.preety,
        color: COLORS.white,
        fontSize: 16,
        lineHeight: 16
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 45,
    },
    buttonWrapper2: {
        position: 'absolute',
        paddingTop: 20,
        bottom: 45,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "rgba(65, 65, 65, 1)"
        
    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.green,
        alignSelf: 'stretch',
        textAlign: 'center',
        width: width / 2,
        marginLeft: 16,
    },
    button3: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.white,
        alignSelf: 'stretch',
        textAlign: 'center',
        width: width / 2,
        marginLeft: 16,
    },
    buttonTextSecondary: {
        color: COLORS.gray,
        fontSize: 12,
        lineHeight: 12
    }
})