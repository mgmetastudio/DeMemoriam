import { StyleSheet, Text, View, SafeAreaView, Dimensions, Pressable, TextInput, ScrollView, Image, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import NavigationBar from "../components/NavigationBar";
import BottomBar from "../components/BottomBar";
import * as SecureStore from 'expo-secure-store';
import { getApiConfig } from '../functions/api';
import { COLORS, FONTS } from "../constants";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios"
import {stringify} from "query-string"

var width = Dimensions.get('window').width - 40;

const Profile = ({navigation, tokenId}) => {
  const logOut = () => {
    SecureStore.deleteItemAsync('auth_user');
    SecureStore.deleteItemAsync('secure_token');
    navigation.navigate("Registration");
  }
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('This is my profile on DeMemoriam social platform');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');
  const [token, setToken] = useState('');
  const [image, setImage] = useState(null);
  const defaultImage = require('../assets/Images/default-user.jpg')
  
  async function getToken() {
    const token = await SecureStore.getItemAsync('secure_token');
    setToken(token);
  }
  getToken();
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const pickImage = async () => {
    console.log('image upload function');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.log("Image data from phone: ", result.assets[0]);
      setImage(result.assets[0].uri);
      const formData = new FormData();
      formData.append('avatar', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: `${getRandomInt(100000)}-animated-nft.jpeg`,
      });
      console.log("Image url from phone: ", formData);

      fetch(
        'https://api.dememoriam.ai/user/profile/avatar/',
        {
          method: 'PUT',
          headers: {
            'authorization': `Bearer ${token}`,
          },
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setAvatar(result.avatar);
        })
        .catch((error) => {
          console.error('Error with image:', error);
        });
  }};


  useEffect(() => {
    axios.get(`/user/profile/`, getApiConfig(true, token)).then((response) => {
      console.log('Responce: ', response['data']);
      setUsername(response['data'].username);
      setDate(response['data'].birth_date);
      setGender(response['data'].gender);
      setEmail(response['data'].email);
      if(response['data'].avatar !== null) {
        setAvatar(response['data'].avatar);
      }
    }).catch((error) => {
      console.log('Error getting profile:', error)
    });
  }, [token]);
  console.log("Avatar src: ", avatar)
  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar title={"Edit Profile"} navigation={navigation} save={true} />
      <ScrollView style={styles.inputContainer}>
          <View style={styles.userInfoLeft}>
            <Image style={styles.image} source={avatar ? { uri: avatar , width: 65, height: 65, } : defaultImage}  />
            <View style={styles.changeContainer}>
              <Text style={styles.usernameText}>{username}</Text>
              <Pressable style={styles.fileUpload}  onPress={pickImage}><Text style={styles.changeText}>Change profile picture</Text></Pressable>
            </View>
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>Username</Text>
          <TextInput
              style={styles.input}
              onChangeText={setUsername}
              placeholder="Name"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={username}
            />
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
              style={styles.input}
              onChangeText={setUsername}
              placeholder='Coming soon'
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value='Coming soon'
            />
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
              style={styles.input}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={email}
            />
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
              style={styles.input}
              onChangeText={setUsername}
              placeholder="Coming soon"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value="Coming soon"
            />
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
              style={styles.input}
              onChangeText={setDate}
              placeholder="Date of birth"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={date}
            />
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
              style={styles.input}
              onChangeText={setGender}
              placeholder="Gender"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={gender}
            />
          </View>
          <View>
            <Pressable style={styles.button} onPress={logOut}>
              <Text style={styles.buttonText}>
                Log out
              </Text>
            </Pressable>
          </View>
      </ScrollView>
      <BottomBar navigation={navigation} portfolio={true} avatar={avatar} />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    inputContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 100,
    },
    container: {
        backgroundColor: "rgba(11, 11, 11, 0.8)"
    },
    image: {
      width: 45,
      height: 45,
      borderRadius: 20
    },
    userInfoLeft: {
      display: "flex",
      flexDirection: "row",
      paddingTop: 16,
      alignItems: "center",
    },
    changeContainer: {
      marginLeft: 16
    },
    usernameText: {
      color: COLORS.white,
      fontFamily: FONTS.regular,
      fontSize: 14,
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
        alignSelf: 'stretch',
        textAlign: 'center',
        marginTop: 30
    },
    buttonText: {
        fontFamily: FONTS.preety,
        color: COLORS.green,
        fontSize: 16
    },
    changeText: {
      color: COLORS.green,
      fontFamily: FONTS.medium,
      fontSize: 14,
    },
    label: {
      color: COLORS.gray,
      fontFamily: FONTS.regular,
      fontSize: 14,
      marginBottom: 8,
      marginTop: 16
    },
    input: {
      fontSize: 14,
      fontFamily: FONTS.regular,
      color: COLORS.gray,
      borderWidth: 1,
      borderColor: "rgba(65, 65, 65, 1)",
      marginBottom: 7,
      padding: 10,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 2
    },
})