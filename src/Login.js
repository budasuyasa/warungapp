/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

const backgroundImage = require('./images/background.png');

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

export default class Login extends Component {

  static navigationOptions = {
    title: 'Login',
  };

  state = {

  };

  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
        this.setState({
          fbUserName: json.name,
          fbUserId: json.id,
          fbUserEmail: json.email
        });

        console.log(json.name);
      // Some user object has been set up somewhere, build that user here
      // user.name = json.name
      // user.id = json.id
      // user.user_friends = json.friends
      // user.email = json.email
      // user.username = json.name
      // user.loading = false
      // user.loggedIn = true
      // user.avatar = setAvatar(json.id)
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }


  render() {
    return (
        <Image source={backgroundImage} style={styles.bg} >
          <View style={styles.container}>
            <Text style={styles.text} >
              Sign In untuk dapat mengulas dan menambahkan warung baru. Simpan warung yang kamu suka sekali untuk selamanya
            </Text>
            <LoginButton
              publishPermissions={["publish_actions"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        const { accessToken } = data;
                        this.initUser(accessToken);
                      }
                    )
                  }
                }
              }
              onLogoutFinished={() => alert("logout.")}/>
          </View>
        </Image>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20
  },
  bg: {
    flex: 1,
    width: null,
    height: null,
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },


});
