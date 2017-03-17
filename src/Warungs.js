import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
  Alert
} from 'react-native';

import { Button, Icon, List, ListItem } from 'react-native-elements'

import {
  WarungLikeText,
  WarungLikedText,
  WarungImageDir,
  isUserLogedInKey,
  userIdKey,
  userNameKey
} from './Config';


class Warungs extends Component {
  static navigationOptions = {
    title: ({state}) => `${state.params.warung.warungNama}`,
  };

  state = {
    liked: false,
    likeText: WarungLikeText,
    totalLike: parseInt(this.props.navigation.state.params.warung.warungTotalRate),
    isUserLogedIn: '0',
    userId: null,
    userName: null,
  };

  //Cek is user logedin
  componentWillMount() {
    this.load();
  }

  _showLoginScreen = () => {
    const { navigate } = this.props.navigation;
    navigate('Login');
  }

  load = async () => {
    try {
      const isLogedIn = await AsyncStorage.getItem(isUserLogedInKey);
      console.log(isLogedIn);

      if (isLogedIn !== null) {
        this.setState({isUserLogedIn: isLogedIn});
      }
    } catch (e) {
      console.error('Failed to load name.')
    }
  }


  _onPressLike = () => {
    if(this.state.isUserLogedIn === '0'){
      this._showLoginScreen();
    }else{
      this.setState({
        liked: !this.state.liked, //inverse state liked
        totalLike: this.state.liked ? this.state.totalLike - 1 : this.state.totalLike + 1
      });
    }

  }

  render() {
    //Get data yang dipass dari HomeScreen degan mengakses state dari navigation
    const { params } = this.props.navigation.state;
    //Ubah <br> tag dengan new line
    const deskripsi = params.warung.warungDeskripsi.replace(/<br\s*[\/]?>/gi, "\n");
    //Info warung lainnya
    const listInfo = [
    {
      title: `Buka ${params.warung.warungWaktuBuka} - ${params.warung.warungWaktuTutup}`,
      icon: 'clock-o'
    },
    {
      title: `Harga Lvl ${params.warung.warungLevelHarga}`,
      icon: 'money'
    },
    {
      title: `Delivery: ${params.warung.warungDelivery}`,
      icon: 'truck'
    },
    {
      title: `Telp: ${params.warung.warungPhone}`,
      icon: 'phone'
    },
    {
      title: `Pemilik: ${params.warung.warungOwner}`,
      icon: 'user'
    },
  ];

  const likedStyles = this.state.liked ? styles.liked : null;
  const captionLike = this.state.liked ? WarungLikedText : WarungLikeText;
  const totalLike = this.state.totalLike;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.thumbail} source={{uri: WarungImageDir+params.warung.warungGambar }}>
            <View style={styles.ratingInfo}>
              <Icon type='font-awesome' name='heart-o' color='#fff'/>
              <Text style={{color:'white', fontSize: 16}}>
                &nbsp; {totalLike} Suka
              </Text>
            </View>
          </Image>
          <View style={styles.alamatContainer}>
              <Text style={styles.infoAlamat}>{params.warung.warungAlamat}</Text>
              <Icon
                raised
                style={{flex: 1}}
                name='map-marker'
                type='font-awesome'
                color='#3498db'
                onPress={() => console.log('hello')} />
          </View>

          <View style={styles.likeContainer}>
            <TouchableHighlight
              onPress={this._onPressLike}
              style={styles.btn}
              underlayColor="#fefefe">
              <Image source={require('./images/plain-heart.png')} style={[styles.icon, likedStyles]}/>
            </TouchableHighlight>
            <Text style={styles.textLike}>
              {captionLike}
            </Text>
          </View>

          <View style={styles.infoContainer}>
              <Text>{deskripsi}</Text>
              <List>
                {
                  listInfo.map((item, i) => (
                    <ListItem
                      key={i}
                      title={item.title}
                      leftIcon={{name: item.icon, type: 'font-awesome'}}
                      hideChevron={true}
                    />
                  ))
                }
              </List>

              <Button
                raised
                icon={{name: 'coffee', type: 'font-awesome'}}
                title='Menu'
                buttonStyle={{backgroundColor: '#2ecc71', marginBottom: 10, marginTop: 10,}}
              />
              <Button
                raised
                icon={{name: 'comment', type: 'font-awesome'}}
                title='Ulas Warung'
                buttonStyle={{backgroundColor: '#9b59b6', marginBottom: 10, marginTop: 10,}}
              />
          </View>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  thumbail: {
    height: 240,
  },
  panelOption: {
    flexDirection: 'row',
  },
  infoContainer: {
    padding: 10
  },
  infoAlamat: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1
  },
  ratingInfo: {
    flexDirection: 'row',
    position: 'absolute',
    height: 33,
    padding: 5,
    borderRadius: 17.5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#3498db',
    bottom: 10,
    right: 10,
  },
  alamatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingLeft: 10,
    paddingRight: 10
  },
  likeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  icon: {
    width: 48,
    height: 48,
    tintColor: '#f1f1f1',
  },
  liked: {
    tintColor: '#e74c3c',
  },
  textLike: {
    color: '#bdc3c7',
    padding: 5,
    borderRadius: 5,
  }
});

export default Warungs;
