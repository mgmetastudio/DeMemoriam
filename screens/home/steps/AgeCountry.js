import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import React, { useState } from 'react'
import { COLORS, FONTS } from "../../../constants";

export default function AgeCountry() {
  const [date, setDate] = useState('');
  const [country, setCountry] = useState('');
  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
          <Svg style={{ marginRight: 10 }} width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M17.6825 8.76371C17.9633 8.41281 18.2425 8.05983 18.5215 7.70688C18.8168 7.33335 18.8122 6.74446 18.5116 6.37713C15.6928 2.93312 12.6185 0.00115543 8.73387 0.00115543C3.62405 0.00115543 0 4.44511 0 10.1081C0 15.5557 3.68399 20 8.31786 20C13.1899 20 16.4578 16.0577 21.2704 9.89306C23.0531 7.81417 26.5584 3.22662 30.1822 3.22662C33.2718 3.22662 35.8268 5.66383 35.6483 10.2514C35.5297 13.7636 33.3311 16.7742 30.0037 16.7742C27.1111 16.3932 25.196 14.5524 22.4042 11.251C22.0879 10.8775 21.5794 10.8888 21.2751 11.2769C20.9718 11.6642 20.6673 12.0502 20.3615 12.4345C20.0558 12.8188 20.0693 13.4309 20.3925 13.7943C24.1349 18.0054 26.8939 19.9996 30.0039 19.9996C34.8164 19.9996 38.8571 16.129 38.8571 10.036C38.8571 4.37312 35.4705 0 30.5986 0C25.8454 0 22.7561 3.72761 19.1615 8.27909C15.5665 12.8306 12.3583 16.774 8.91224 16.774C5.70373 16.774 3.26762 13.9069 3.20838 10.1794C3.14879 6.52361 5.16924 3.22608 8.43706 3.22608C11.7145 3.22608 14.3076 5.96267 16.5423 8.76263C16.8538 9.15225 17.3711 9.15225 17.6825 8.76293L17.6825 8.76371Z" fill="#75E9BB"/>
          </Svg>
          <Text style={styles.title}>DeMemoriam</Text>
      </View>
      <View>
            <Text style={styles.title2}>Enter your date of birth & country of origin</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setDate}
          placeholder="MM/dd/year"
          value={date}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setCountry}
          value={country}
          placeholder="Country"
        />
      </View>
      <View>
            <Text style={styles.signIn}>Already have an account? <Text style={styles.signInLink}>Sign in</Text></Text>
      </View>
    </View>
  )
}

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
      fontSize: 22,
      fontFamily: FONTS.preety,
      color: COLORS.white,
      textAlign: "center",
  },
  title2: {
    fontSize: 22,
    fontFamily: FONTS.preety,
    color: COLORS.white,
    textAlign: "center",
    marginTop: 4
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
buttonText: {
  color: COLORS.white,
  fontFamily: FONTS.regular,
  fontSize: 14,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
},
buttonsWrapper: {
  paddingTop: 20,
  paddingBottom: 20
},
signIn: {
  fontSize: 14,
  fontFamily: FONTS.regular,
  color: COLORS.gray,
  textAlign: "center",
},
signInLink: {
  fontSize: 14,
  fontFamily: FONTS.regular,
  color: COLORS.green,
  textAlign: "center",
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