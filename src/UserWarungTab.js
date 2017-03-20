import React, {Component} from 'react';
import {
   AppRegistry,
   View,
   Text,
   ScrollView,
   StyleSheet,
   ListView,
   Image,
   ActivityIndicator,
   TouchableHighlight,
   AsyncStorage,
} from 'react-native';
import { Card, List, ListItem } from 'react-native-elements';
import { EndpointURL, ImageURL, LocalStorage } from './Config';
import { Button, Icon } from 'react-native-elements'
import { realmWarung } from './realm/RealmWarung';

//Prepare ListView
var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.warungId !== r2.warungId
});

class UserWarungTab extends Component {
  //Set setting untuk navigasi
  static navigationOptions = {
    title: 'Like',
    tabBar: {
      label: 'Like',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ tintColor }) => (
        <Icon
          name='heart'
          type='font-awesome'
          color='#f50' />
      ),
    },
  };

  state = {
    loading: true,
    error: false,
    dataSource: ds.cloneWithRows([])
  };

  _getLikedWarung = async() => {
    //Get list of user liked warung
    try {

      //Cek access token user
      const accessToken = await AsyncStorage.getItem(LocalStorage.userAccessToken);

      if(accessToken === null || accessToken === undefined){
        return;
      }

      //Dapatkan warung yang disimpan user
      let rWarungs = realmWarung.objects('Warungs');

      //Stop if no warung stored
      if(rWarungs.length === 0){
        return;
      }

      //Get data dari REST API jika local warung ada
      let arrWarungIds = [];
      rWarungs.forEach((values) => {
        arrWarungIds.push(values.warungId);
      });
      let warungIds = JSON.stringify(arrWarungIds);

      const response = await fetch(EndpointURL.GET_WARUNG, {
      	method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded','Accept': 'application/json'},
        body: `access_token=${accessToken}&warung_list=${warungIds}`,
      });
      const res = await response.json();

      if(res.status==='success'){
        //Update data warung pada local storage
        realmWarung.write(()=>{
          res.data.forEach((values)=>{
              realmWarung.create('Warungs', values, true);
          });
        });
        this.setState({loading: false, dataSource: this.state.dataSource.cloneWithRows(res.data)});
      }else{
        //Jika get data dari REST API gagal, load dari local
          this.setState({loading: false, dataSource: this.state.dataSource.cloneWithRows(rWarungs)});
      }

    } catch (e) {
      console.log(e);
      let rWarungs = realmWarung.objects('Warungs');
      this.setState({loading: false, dataSource: this.state.dataSource.cloneWithRows(rWarungs)});
    }
  }

  componentWillMount() {
    this._getLikedWarung();
  }

  _openWarungs = (warungs) => {
    const { navigate } = this.props.navigation;
    console.log(warungs.warungNama);
    navigate('Warungs', {warung: warungs});
  }

  renderRow = (rowData) => {
    return (
      <TouchableHighlight onPress={ () => this._openWarungs(rowData)} underlayColor="#fefefe">
        <Image style={styles.thumbail} source={{uri: ImageURL+rowData.warungGambar }}>
            <View style={styles.level}>
              <Text style={{color:'white'}}>Lvl {rowData.warungLevelHarga} </Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{rowData.warungNama}</Text>
                <Text style={styles.subtitle}>{rowData.warungAlamat}</Text>
            </View>
        </Image>
    </TouchableHighlight>
    );
  }

  render() {
    const {loading, error} = this.state;
    const { navigate } = this.props.navigation;

    if(loading){
      return(
        <View style={styles.containerLoading}>
            <ActivityIndicator size="large" animating={true} />
            <Text>Loading...</Text>
        </View>
      );
    }

    if(error){
      return(
        <View style={[styles.containerLoading]}>
          <Icon
            name='meh-o'
            type='font-awesome'
            color='#ccc' />
          <Text>Tidak Dapat Mengontak Server!</Text>
        </View>
      );
    }

    return (
      <View style={[styles.bgWhite, styles.container]}>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerListView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    padding: 15,
    marginBottom: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbail: {
    flex: 1,
    height: 144
  },
  info: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowRadius: 10,
    textShadowOffset: {
      width: 2,
      height: 1
    }
  },
  subtitle: {
    color: 'white',
    textShadowColor: '#000',
    textShadowRadius: 10,
    textShadowOffset: {
      width: 2,
      height: 1
    }
  },
  level: {
    height: 25,
    borderRadius: 15,
    padding: 2.5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(46, 204, 113,0.5)',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  tabIcon: {
    width: 60,
    height: 60
  }
});

export default UserWarungTab;
