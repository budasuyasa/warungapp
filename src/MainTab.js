/*
  Struktur dari MainTab adalah TabNavigator
  Screen terdiri dari tab warung, search, like dan profile
*/
import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
//Import tab screen
import UserWarungTab from './UserWarungTab';
import WarungList from './WarungList';
import UserProfile from './UserProfile';
import Search from './Search';

const MainTab = TabNavigator({
  WarungTab: { screen: WarungList },
  Search: { screen: Search },
  UserLikeTab: { screen: UserWarungTab },
  UserProfile: { screen: UserProfile },
},
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
    activeTintColor: '#f50',
    inactiveTintColor: '#000',
    showIcon : true,
    showLabel: true,
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: 'white',
    },
  }
});

export default MainTab;
