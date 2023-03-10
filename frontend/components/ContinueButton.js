import { View, SafeAreaView, FlatList, Text, StyleSheet, Image, Pressable, Alert, Dimensions } from "react-native";
import { COLORS, FONTS } from "../constants";
import React from 'react'

var width = Dimensions.get('window').width - 32;

const ContinueButton = (props) => {
  return (
    <View style={styles.buttonWrapper}>
        <Pressable style={styles.button} onPress={() => props.onContinue()}>
            <Text style={styles.buttonText}>
                {props.step == 7 ? "Continue to preview" : "Continue"}</Text>
        </Pressable>
    </View>
  )
}

export default ContinueButton

const styles = StyleSheet.create({
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
    buttonText2: {
        fontFamily: FONTS.preety,
        color: COLORS.white,
        fontSize: 16,
        lineHeight: 16
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 40,
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