import { StyleSheet, Text, View, SafeAreaView, Dimensions, Pressable } from 'react-native'
import React from 'react'
import NavigationBar from "../components/NavigationBar"
import * as SecureStore from 'expo-secure-store';
import { COLORS, FONTS } from "../constants";

var width = Dimensions.get('window').width - 40;

const Profile = ({navigation}) => {

    const logOut = () => {
        SecureStore.deleteItemAsync('auth_user');
        SecureStore.deleteItemAsync('secure_token');
        navigation.navigate("Registration");
    }


  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar title={"Edit Profile"} />
      <Pressable style={styles.button} onPress={() => logOut()}><Text style={styles.buttonText}>Log Out</Text></Pressable>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(11, 11, 11, 0.8)"
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
})