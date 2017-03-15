import React from 'react';
import { StackNavigator } from 'react-navigation';

//Import screen
import HomeScreen from './HomeScreen';
import Warungs from './Warungs';
import Login from './Login';

const MainApp = StackNavigator({
  Home: { screen: HomeScreen },
  Warungs: {screen: Warungs },
  Login: {screen: Login },
});

export default MainApp;
