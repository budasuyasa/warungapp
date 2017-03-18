/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  AsyncStorage,
} from 'react-native';

import {
  Button
} from 'react-native-elements';

import {
  EndpointURL,
  LocalStorage
} from './Config';

import { createStore } from 'redux';
import { reducer, actionCreators } from './redux/LoginRedux';

const backgroundImage = require('./images/background.png');
const store = createStore(reducer);


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
    console.log('Get facebook user data');
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
        console.log(token);
        this._login(json.email, json.name, 'facebook', token);
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  _login = async (email, name, type, token) => {
    console.log('Login to server...')
    try {
      console.log(EndpointURL.LOGIN);
      const response = await fetch(EndpointURL.LOGIN, {
      	method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded','Accept': 'application/json'},
        body: `email=${email}&name=${name}&type=${type}&token=${token}`
      });
      const userData = await response.json();
      console.log(userData);
      this._saveLocalStorage(userData);
    } catch (e) {
      console.log(e);
      this.setState({loading: false, error: true});
    }
  }

  _saveLocalStorage = async (res) => {
    console.log('save user data to local storage');
    try {
      await AsyncStorage.setItem(LocalStorage.userAccessToken, res.userAccessToken);
      await AsyncStorage.setItem(LocalStorage.userEmail, res.userEmail);
      await AsyncStorage.setItem(LocalStorage.userName, res.userName);
      await AsyncStorage.setItem(LocalStorage.isUserLogedIn, '1'); //set 1 untuk login
      //Finish login screen
      this.props.navigation.goBack();
    } catch (e) {
      console.error(e);
      console.error('Failed to save local data');
    }
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
              <Button
                raised
                icon={{name: 'coffee', type: 'font-awesome'}}
                title='Menu'
                buttonStyle={{backgroundColor: '#2ecc71', marginBottom: 10, marginTop: 10,}}
                onPress={()=>{
                  const { navigate } = this.props.navigation;
                  navigate('Warungs', {warung: this.props.navigation.state.params.warung})}
                }
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
