import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/registration/Registration';
import Feed from '../screens/home/Home';

const screens = {
  Home: {
    screen: Home,
  },
  Feed: {
    screen: Feed,
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

