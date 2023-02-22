import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"; 
import { Image, Dimensions} from 'react-native';
import { useFonts } from "expo-font";
import Registration from "./screens/registration/Registration";
import Home from "./screens/home/Home";

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
    PopinsMedium: require("./assets/Fonts/Poppins-Medium.ttf")
  });
  const { width, height } = Dimensions.get("screen");


  if(!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Image source={require("./assets/Images/main-bg.jpg")} style={{width, height, position: "absolute"}} />
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false, 
        }} 
        initialRouteName="Home" >
        <Stack.Screen name="Registration" options={{title: 'Registration'}} component={Registration} />
        <Stack.Screen name="Home" options={{title: 'Home'}} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;