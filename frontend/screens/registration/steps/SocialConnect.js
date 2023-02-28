import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import React, { useState } from 'react'
import { COLORS, FONTS } from "../../../constants";
import axios from "axios";
import { getApiConfig } from '../../../functions/api';
import * as SecureStore from 'expo-secure-store';

const googleIcon = <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M20.3684 10.2281C20.3693 9.54663 20.3113 8.8664 20.195 8.19482H10.6992V12.046H16.138C16.0267 12.6611 15.7911 13.2475 15.4455 13.7697C15.0999 14.292 14.6513 14.7393 14.1269 15.0848V17.5846H17.3728C19.2734 15.8444 20.3684 13.271 20.3684 10.2281Z" fill="#4285F4"/>
<Path d="M10.6997 19.9998C13.4169 19.9998 15.7049 19.1137 17.3733 17.586L14.1274 15.0861C13.2239 15.6944 12.0604 16.0416 10.6997 16.0416C8.07328 16.0416 5.84408 14.2834 5.04693 11.9141H1.70312V14.4903C2.5412 16.1465 3.82629 17.5387 5.41494 18.5116C7.00358 19.4844 8.83324 19.9997 10.6997 19.9998Z" fill="#34A853"/>
<Path d="M5.04686 11.9141C4.62543 10.6726 4.62543 9.32806 5.04686 8.08651V5.51025H1.70305C0.998032 6.90345 0.630859 8.44108 0.630859 10.0003C0.630859 11.5595 0.998032 13.0972 1.70305 14.4904L5.04686 11.9141Z" fill="#FBBC04"/>
<Path d="M10.6997 3.95879C12.1356 3.93549 13.5231 4.47429 14.5623 5.45872L17.4362 2.60469C15.6139 0.904883 13.1996 -0.0283412 10.6997 0.000656061C8.83324 0.000740536 7.00358 0.515984 5.41494 1.48886C3.82629 2.46174 2.5412 3.85397 1.70312 5.5101L5.04693 8.08636C5.84408 5.71704 8.07328 3.95879 10.6997 3.95879Z" fill="#EA4335"/>
</Svg>;
const facebookIcon = <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<G ClipPath="url(#clip0_260_5181)">
<Path d="M5.27082 10.652H7.46315V19.6774C7.46315 19.8556 7.60753 20 7.78573 20H11.5029C11.6811 20 11.8255 19.8556 11.8255 19.6774V10.6945H14.3457C14.5096 10.6945 14.6475 10.5715 14.6662 10.4088L15.049 7.08606C15.0595 6.99465 15.0305 6.9031 14.9693 6.83452C14.9081 6.76587 14.8205 6.72658 14.7286 6.72658H11.8256V4.64374C11.8256 4.01587 12.1637 3.69748 12.8305 3.69748C12.9255 3.69748 14.7286 3.69748 14.7286 3.69748C14.9068 3.69748 15.0511 3.55303 15.0511 3.3749V0.324968C15.0511 0.146774 14.9068 0.0023871 14.7286 0.0023871H12.1128C12.0943 0.00148387 12.0533 0 11.993 0C11.5391 0 9.96147 0.0890967 8.71527 1.23555C7.3345 2.506 7.52644 4.02716 7.57231 4.2909V6.72652H5.27082C5.09263 6.72652 4.94824 6.8709 4.94824 7.0491V10.3294C4.94824 10.5075 5.09263 10.652 5.27082 10.652Z" fill="#4A5F9A"/>
</G>
<Defs>
<ClipPath id="clip0_260_5181">
<Rect width="20" height="20" fill="white"/>
</ClipPath>
</Defs>
</Svg>;
const linkedinIcon = <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clipPath="url(#clip0_260_5187)">
<Path d="M10 0C4.47656 0 0 4.47656 0 10C0 15.5234 4.47656 20 10 20C15.5234 20 20 15.5234 20 10C20 4.47656 15.5234 0 10 0ZM7.20312 14.1836H5.25391V7.94531H7.20312V14.1836ZM6.17578 7.16406H6.16016C5.45312 7.16406 4.99609 6.6875 4.99609 6.08203C4.99609 5.46484 5.46875 5 6.1875 5C6.90625 5 7.34766 5.46484 7.36328 6.08203C7.36719 6.68359 6.91016 7.16406 6.17578 7.16406ZM15 14.1836H12.7891V10.957C12.7891 10.1133 12.4453 9.53516 11.6836 9.53516C11.1016 9.53516 10.7773 9.92578 10.6289 10.3008C10.5742 10.4336 10.582 10.6211 10.582 10.8125V14.1836H8.39062C8.39062 14.1836 8.41797 8.46484 8.39062 7.94531H10.582V8.92578C10.7109 8.49609 11.4102 7.88672 12.5273 7.88672C13.9141 7.88672 15 8.78516 15 10.7148V14.1836Z" fill="#367CB6"/>
</G>
<Defs>
<ClipPath id="clip0_260_5187">
<Rect width="20" height="20" fill="white"/>
</ClipPath>
</Defs>
</Svg>;
const emailIcon = <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M12.6927 10.4875L18.0529 6.03415V14.9412L12.6927 10.4875ZM8.38641 11.2264L2.83624 15.8382H17.3532L11.803 11.2264L11.2524 11.6841C10.9271 11.9542 10.5175 12.1022 10.0946 12.1022C9.67161 12.1022 9.26207 11.9542 8.93673 11.6841L8.38614 11.2266L8.38641 11.2264ZM7.49711 10.4875L2.13688 14.9409V6.03381L7.49711 10.4872V10.4875ZM10.5264 10.8095L17.3531 5.13691H2.83614L9.66311 10.8095C9.78364 10.9117 9.93659 10.9679 10.0946 10.9679C10.2527 10.9679 10.4056 10.9117 10.5261 10.8095H10.5264ZM17.3777 4H2.81179C2.33138 4.00054 1.87096 4.19165 1.53115 4.53129C1.19151 4.87107 1.00051 5.33152 1 5.81193V15.163C1.00054 15.6434 1.19152 16.104 1.53115 16.4438C1.87093 16.7834 2.33138 16.9745 2.81179 16.9752H17.3777C17.8581 16.9745 18.3186 16.7834 18.6584 16.4438C18.998 16.104 19.189 15.6434 19.1895 15.163V5.81193C19.189 5.33152 18.998 4.8711 18.6584 4.53129C18.3186 4.19165 17.8581 4.00055 17.3777 4Z" fill="#75E9BB"/>
</Svg>



 




const SocialConnect = (props) => {

  const [email, setEmail] = useState('andriuskevicius.ernestas@gmail.com');
  const [password, setPassword] = useState('darvienas');
  const [errorMessages, setErrorMessages] = useState('');

  const Login = async e => {
    e.preventDefault();
    const user = {
      email: email,
      password: password
    };

    axios.post("/rest-auth/login/", user, getApiConfig(false))
      .then((response) => {
        const data = response.data;
        save('secure_token', data.access_token);
        setErrorMessages('');
      }).catch((error) => {
        setErrorMessages('Email or password was incorect, try again.');
        console.log("Login error", error);
      })
  };
  async function save(key, value) {
    await SecureStore.deleteItemAsync(key)
    await SecureStore.setItemAsync(key, value);
    const token = await SecureStore.getItemAsync('secure_token');
    console.log("Čia jau išsaugotas: ", token);
    props.navigation.navigate("Home");
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
          <Svg style={{ marginRight: 10 }} width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M17.6825 8.76371C17.9633 8.41281 18.2425 8.05983 18.5215 7.70688C18.8168 7.33335 18.8122 6.74446 18.5116 6.37713C15.6928 2.93312 12.6185 0.00115543 8.73387 0.00115543C3.62405 0.00115543 0 4.44511 0 10.1081C0 15.5557 3.68399 20 8.31786 20C13.1899 20 16.4578 16.0577 21.2704 9.89306C23.0531 7.81417 26.5584 3.22662 30.1822 3.22662C33.2718 3.22662 35.8268 5.66383 35.6483 10.2514C35.5297 13.7636 33.3311 16.7742 30.0037 16.7742C27.1111 16.3932 25.196 14.5524 22.4042 11.251C22.0879 10.8775 21.5794 10.8888 21.2751 11.2769C20.9718 11.6642 20.6673 12.0502 20.3615 12.4345C20.0558 12.8188 20.0693 13.4309 20.3925 13.7943C24.1349 18.0054 26.8939 19.9996 30.0039 19.9996C34.8164 19.9996 38.8571 16.129 38.8571 10.036C38.8571 4.37312 35.4705 0 30.5986 0C25.8454 0 22.7561 3.72761 19.1615 8.27909C15.5665 12.8306 12.3583 16.774 8.91224 16.774C5.70373 16.774 3.26762 13.9069 3.20838 10.1794C3.14879 6.52361 5.16924 3.22608 8.43706 3.22608C11.7145 3.22608 14.3076 5.96267 16.5423 8.76263C16.8538 9.15225 17.3711 9.15225 17.6825 8.76293L17.6825 8.76371Z" fill="#75E9BB"/>
          </Svg>
          <Text style={styles.title}>DeMemoriam</Text>
      </View>
      <View>
            <Text style={styles.title2}>Welcome back</Text>
      </View>
      <View style={styles.buttonsWrapper}>
        <Pressable style={styles.button} onPress={() => props.setStep(3)}>
            <Text style={styles.buttonText}>{ googleIcon }Sign up with Google</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => props.setStep(3)}>
            <Text style={styles.buttonText}>{ facebookIcon }Sign up with Google</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => props.setStep(3)}>
            <Text style={styles.buttonText}>{ linkedinIcon }Sign up with LinkedIn</Text>
        </Pressable>
        <Pressable style={styles.buttonSign} onPress={() => props.setStep(3)}>
            <Text style={styles.buttonEmailText}>Sign in with email</Text>
        </Pressable>
      </View>
      <View>
      <TextInput
          style={styles.input}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Email address"
          placeholderTextColor="rgba(155, 155, 155, 1)"
          keyboardType="email-address" 
          caretHidden={false}
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="rgba(155, 155, 155, 1)"
          value={password} 
        />
      </View>
      <Text style={styles.errorMessage}>{ errorMessages }</Text>
      <Pressable style={styles.forgot} onPress={() => props.setStep(3)}>
          <Text style={styles.forgotText}>Forgot password</Text>
      </Pressable>
      <Pressable style={styles.buttonSign} onPress={e => Login(e)}>
            <Text style={styles.buttonSignText}>Sign in</Text>
        </Pressable>
      <View>
            <Text style={styles.signIn}>Don't have account?
            
            <Pressable onPress={() => props.setStep(3)}>
              <Text style={styles.signInLink}>Sign up</Text>
            </Pressable>
            </Text>
      </View>
    </View>
  )
}

export default SocialConnect

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
      marginLeft: 24,
      marginRight: 24,
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
  errorMessage:  {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.error,
  },
  forgot: {
    paddingTop: 5,
    float: "right",
    paddingBottom: 20,
  },
  forgotText: {
    color: COLORS.green,
    fontFamily: FONTS.regular,
    fontSize: 16
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
  padding: 10
},
buttonText: {
  color: COLORS.white,
  fontFamily: FONTS.regular,
  fontSize: 14,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
},
buttonSign: {
  borderWidth: 1,
  borderColor: COLORS.green,
  marginBottom: 7,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
  marginBottom: 30
},
buttonSignText: {
  color: COLORS.green,
  fontFamily: FONTS.preety,
  fontSize: 14,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
},
buttonEmailText: {
  color: COLORS.green,
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
}

})