/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Button, Icon } from 'react-native-elements'

export default class Search extends Component {
  //Set setting untuk navigasi
  static navigationOptions = {
    title: 'Search',
    tabBar: {
      label: 'Search',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ tintColor }) => (
        <Icon
          name='search'
          type='font-awesome'
          color='#f50' />
      ),
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the Search component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
