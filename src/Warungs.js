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

import {
  EndpointURL,
  LocalStorage,
} from './Config';

import { realmWarung } from './realm/RealmWarung';

class Warungs extends Component {
  static navigationOptions = {
    title: ({state}) => `${state.params.warung.warungNama}`,
  };

  state = {
    liked: false,
    likeText: WarungLikeText,
    totalLike: parseInt(this.props.navigation.state.params.warung.warungTotalRate),
    userData: {
      name: 'You',
      email: null,
      accessToken: null,
      isUserLogedIn: '0',
    }
  };

  componentWillMount = async() => {
    //this.load();
    const warungId = this.props.navigation.state.params.warung.warungId;
    try {
      const isLogedIn = await AsyncStorage.getItem(LocalStorage.isUserLogedIn);
      const name = await AsyncStorage.getItem(LocalStorage.userName);
      const accessToken = await AsyncStorage.getItem(LocalStorage.userAccessToken);
      const email = await AsyncStorage.getItem(LocalStorage.userEmail);
      if(isLogedIn === '1'){
        this.setState({userData:{
          name: name,
          email: email,
          accessToken: accessToken,
          isUserLogedIn: '1',
        }});
        this._like_get(accessToken);
      }
    } catch (e) {
      console.log('Failed to load name.')
    }

    //Jika user sudah like warung, rubah state liked
    try{
      let rWarungs = realmWarung.objects('Warungs').filtered(`warungId = "${warungId}"`);
      if(rWarungs.length===1){
          this.setState({
            liked: true,
          });
      }
    }catch(e){
      console.log(e);
    }
  }

  _showLoginScreen = () => {
    const { navigate } = this.props.navigation;
    navigate('Login',this.props.navigation.state.params.warung);
  }

  _onPressLike =  async () => {
      try {
        const isLogedIn = await AsyncStorage.getItem(LocalStorage.isUserLogedIn);
        const name = await AsyncStorage.getItem(LocalStorage.userName);
        const accessToken = await AsyncStorage.getItem(LocalStorage.userAccessToken);
        const email = await AsyncStorage.getItem(LocalStorage.userEmail);

        if (isLogedIn === null) {
          this._showLoginScreen();
        }else if(isLogedIn === '1'){
          this.setState({userData:{
            name: name,
            email: email,
            accessToken: accessToken,
            isUserLogedIn: '1',
          }});

          this.setState({
            liked: !this.state.liked, //inverse state liked
            totalLike: this.state.liked ? this.state.totalLike - 1 : this.state.totalLike + 1
          });
          this._like_post(accessToken);
        }
      } catch (e) {
        console.log('Failed to load name.')
      }
  }

  _like_get = async (accessToken) => {
    //Get liked dari REALM


    const warungId = this.props.navigation.state.params.warung.warungId;
    console.log('Liking warung...')
    try {
      console.log(`${EndpointURL.LIKE}/?access_token=${accessToken}&warung_id=${warungId}`);
      const response = await fetch(`${EndpointURL.LIKE}/?access_token=${accessToken}&warung_id=${warungId}`, {
      	method: 'get',
        headers: {'Content-Type':'application/x-www-form-urlencoded','Accept': 'application/json'},
      });
      const res = await response.json();
      console.log(res);
      if(res.status==='success')
      {
          if(res.state==='liked')
          {
            this.setState({
              liked: true,
            });
          }
      }

    } catch (e) {
      console.log(e);
      this.setState({loading: false, error: true});
    }
  }

  _like_post = async (accessToken) => {
    const warungId = this.props.navigation.state.params.warung.warungId;
    console.log('Liking warung...')
    try {
      console.log(EndpointURL.LIKE);
      const response = await fetch(EndpointURL.LIKE, {
      	method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded','Accept': 'application/json'},
        body: `access_token=${accessToken}&warung_id=${warungId}`
      });
      const res = await response.json();
      console.log(res);
      if(res.status==='success')
      {
        if(res.state==='liked')
        {
          realmWarung.write(()=>{
              realmWarung.create('Warungs', this.props.navigation.state.params.warung);
          });

        }
        else if(res.state=='unliked')
        {
          let sWarung = realmWarung.objects('Warungs').filtered(`warungId = ${warungId}`);
          realmWarung.write(() => {
            realmWarung.delete(sWarung);
          });
        }
      }
    } catch (e) {
      console.log(e);
      this.setState({loading: false, error: true});
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
