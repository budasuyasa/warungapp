import React from 'react';
import { StackNavigator } from 'react-navigation';

//Import screen
import HomeScreen from './HomeScreen';
import Warungs from './Warungs';

const MainApp = StackNavigator({
  Home: { screen: HomeScreen },
  Warungs: {screen: Warungs },
});

export default MainApp;
