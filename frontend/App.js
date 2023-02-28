import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"; 
import { Image, Dimensions} from 'react-native';
import React, { useState, useEffect } from 'react'
import { useFonts } from "expo-font";
import Registration from "./screens/registration/Registration";
import Home from "./screens/home/Home";
import Post from "./screens/Post";
import User from "./screens/user/User";
import Profile from "./screens/Profile";
import Upload from "./screens/upload/Upload";
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background : "transparent"
  }
};
const App = () => {
  const [loaded] = useFonts({
    PrettywiseExtraBold: require("./assets/Fonts/prettywise-extrabold.ttf"),
    PopinsLight: require("./assets/Fonts/Poppins-Light.ttf"),
    PopinsRegular: require("./assets/Fonts/Poppins-Regular.ttf"),
    PopinsMedium: require("./assets/Fonts/Poppins-Medium.ttf"),
  });
  const { width, height } = Dimensions.get("screen");
  const [tokenId, setTokenID] = useState();
  const [username, setUsername] = useState();
  async function getToken() {
    const token = await SecureStore.getItemAsync('secure_token');
    const username = await SecureStore.getItemAsync('username');
    setTokenID(token);
    setUsername(username);
  }
  useEffect(() => {
    getToken();
  }, []);
  
  if(!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Image source={require("./assets/Images/main-bg.jpg")} style={{width, height, position: "absolute"}} />
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false, 
        }} 
        initialRouteName={tokenId ? "Home" : "Registration"} >
        <Stack.Screen name="Registration" options={{title: 'Registration'}} component={Registration} />
        <Stack.Screen name="Home" options={{title: 'Home'}} component={Home} />
        <Stack.Screen name="Post" options={{title: 'Post'}} component={Post} />
        <Stack.Screen name="User" options={{title: 'User'}} component={User} />
        <Stack.Screen name="Upload" options={{title: 'Upload'}} component={Upload} />
        <Stack.Screen name="Profile" options={{title: 'Profile'}} component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;