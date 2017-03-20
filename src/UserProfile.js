/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Button, Icon } from 'react-native-elements'

export default class UserProfile extends Component {

  //Set setting untuk navigasi
  static navigationOptions = {
    title: 'Profil',
    tabBar: {
      label: 'Profil',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ tintColor }) => (
        <Icon
          name='user'
          type='font-awesome'
          color='#f50' />
      ),
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the UserProfile component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
