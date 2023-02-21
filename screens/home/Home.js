import React, { useState } from "react";
import { View, SafeAreaView, FlatList, Text, StyleSheet, Image, Pressable, Alert, Dimensions } from "react-native";
import Svg, { Path } from 'react-native-svg';
import { NFTCard, HomeHeader, FocusedStatusBar } from "../../components";
import { COLORS, FONTS } from "../../constants";
import { AgeCountry, Welcome, SocialConnect } from "./steps"

var width = Dimensions.get('window').width - 40;

const Home = () => {
   
  const [step, setStep] = useState(1);
  

  return (
    <SafeAreaView style={styles.container}>
       { step !== 1 ?   <Pressable onPress={() => setStep(step - 1)}><HomeHeader setStep={setStep} step={step} /></Pressable> : null }
         { step === 1 ? 
        <Welcome />
        : step === 2 ? 
        <SocialConnect setStep={setStep} />
        : step === 3 ? 
        <AgeCountry />
        : step === 4 ? 
        <Text>Trecias</Text>
        :
        <Text>Ketvirtas</Text> 
        }
        { step !== 2 ? <Pressable style={styles.button} onPress={() => setStep(step + 1)}>
            <Text style={styles.buttonText}>{step == 1 ? "Join now" : "Continue"}</Text>
        </Pressable> : null }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.green,
        position: 'absolute',
        bottom: 45,
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
  });

export default Home