/*
 Struktur utama app adalah StactNavigator
 Screen pertama yang dimunculkan adalah MainTab
*/
import React, { Component } from 'react';
//import tab screen
import MainTab from './MainTab';
import Warungs from './Warungs';
import Login from './Login';

import { StackNavigator } from 'react-navigation';

const MainApp = StackNavigator({
    HomeScreen: { screen: MainTab },
    Warungs: { screen:  Warungs  },
    Login: { screen:  Login  },
  }
);

export default MainApp;
