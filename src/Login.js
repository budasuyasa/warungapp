/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert
} from 'react-native';

import {
  Button
} from 'react-native-elements';

import {
  EndpointURL,
  LocalStorage
} from './Config';

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

        //Login to server
        //this._login(json.email, json.name, 'facebook', token);

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

  // _login(email, name, type, token) {
  //   // url (required), options (optional)
  //   fetch(EndpointURL.LOGIN, {
  //   	method: 'post',
  //     headers: {'Content-Type':'application/x-www-form-urlencoded'},
  //     body: `email=${email}&name=${name}&type=${type}&token=${token}`
  //   }).then(function(response){
  //     res =  response.json();
  //     if(res.status==='success')
  //     {
  //         //Save local user data to local storage
  //         try {
  //           await AsyncStorage.setItem(LocalStorage.userAccessToken, res.userAccessToken);
  //           await AsyncStorage.setItem(LocalStorage.userEmail, res.userEmail);
  //           await AsyncStorage.setItem(LocalStorage.userName, res.userName);
  //           await AsyncStorage.setItem(LocalStorage.isUserLogedIn, '1'); //set 1 untuk login
  //         } catch (e) {
  //           console.error('Failed to save local data');
  //         }
  //
  //         //Finish login screen
  //         this.props.navigation.goBack();
  //     }
  //   }).catch(function(err) {
  //   	console.log(err);
  //     Alert.alert('Login','Tidak bisa mengontak server');
  //   });
  // }

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
              <Button
                raised
                name="Back"
                buttonStyle={{backgroundColor: '#9b59b6', marginBottom: 10, marginTop: 10,}}
                onPress={() => this.props.navigation.goBack()}
               />
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
