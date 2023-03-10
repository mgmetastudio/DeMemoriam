import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Pressable, Dimensions, Button, Keyboard } from "react-native";
import { HomeHeader, ContinueButton } from "../../components";
import { COLORS, FONTS } from "../../constants";
import { AgeCountry, Welcome, SocialConnect, NameEmailPassword, Complete, Slide } from "./steps"
import axios from "axios"
import { getApiConfig } from '../../functions/api';
import * as SecureStore from 'expo-secure-store';

var width = Dimensions.get('window').width - 40;

const Registration = ({navigation}) => {
  const currentDate = new Date();
  const [date, setDate] = useState(new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate()));
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [step, setStep] = useState(1);
  const [errorMessages, setErrorMessages] = useState('');
  const [showLogin, setShowLogin] = useState('');
  const [validation, setValidation] = useState(true);
  const [gender, setGender] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const onRegistration = async e => {
    e.preventDefault();
    const registration = {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
    };

    axios.post(`/rest-auth/registration/`, registration, getApiConfig(false)
    ).then((response) => {
      const data = response.data;
      console.log('');
      save('username', data.user.username);
      save('email', data.user.email);
      save('secure_token', data.access_token);
      save('country', country);
      save('date', date);
      save('auth_user', true);
      //saveNewSettings(data.user.country, data.user.date, data.user.name, data.access_token);
      setErrorMessages('');
      setStep(5);
    }).catch((error) => {
      setErrorMessages('Please try again.');
      console.log('Got error on registration:', error)
    });
  }
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  /* function saveNewSettings(country, date, name, token) {
      var edit = {
          uuid: '',
          country: country,
          birth_date: date,
          first_name: name,
        } 
      fetch('https://api.dememoriam.ai/user/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(edit)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Saved everything from:', data);
      })
  }
  */

  console.log('Collected info:', name, email, date, country, password1, password2);
  const onContinue = () => {
    if(step === 1) {
      setStep(step + 1);
    } else if(step === 3) {
      if( gender && country && date ) {
        setStep(step + 1);
      } else {
        setValidation(false);
      }
    } else {
      setStep(step + 1);
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      {   step === 1 ?
          null : 
          step === 2 ? 
          null : 
          step === 3 ? 
          <Pressable style={styles.icon} onPress={() => setStep(step - 1)}><HomeHeader setStep={setStep} step={step} title={'Registration'} /></Pressable> :
          step === 4 ? 
          <Pressable style={styles.icon} onPress={() => setStep(step - 1)}><HomeHeader setStep={setStep} step={step} title={'Registration'} /></Pressable> :
          null 
      }
      {
        step === 1 ? 
        <Slide step={step} setStep={setStep} setShowLogin={setShowLogin} />
        : step === 2 ? 
        <SocialConnect setStep={setStep} navigation={navigation} setShowLogin={setShowLogin} showLogin={showLogin} />
        : step === 3 ? 
        <AgeCountry 
          setStep={setStep} 
          navigation={navigation} 
          date={date}
          gender={gender}
          setGender={setGender}
          country={country}
          setDate={setDate}
          setCountry={setCountry}
          setValidation={setValidation}
          validation={validation}
         />
        : step === 4 ? 
        <NameEmailPassword
          name={name}
          surname={surname}
          username={username}
          email={email}
          password1={password1}
          password2={password2}
          setName={setName}
          setSurname={setSurname}
          setEmail={setEmail}
          setUsername={setUsername}
          setPassword1={setPassword1}
          setPassword2={setPassword2}
          errorMessages={errorMessages}
          onRegistration={onRegistration}
          validation={validation}
          setValidation={setValidation}
          isKeyboardVisible={isKeyboardVisible}
        />
        : step === 5 ? 
        <Complete navigation={navigation} />
        : null
        }
        { step === 1 ?
          null : 
          step === 2 ?
          null : 
          step === 3 ? 
          !isKeyboardVisible ? <ContinueButton step={step} setStep={setStep} navigation={navigation} onContinue={onContinue}  /> : null : 
          null }
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

export default Registration