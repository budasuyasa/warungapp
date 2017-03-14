import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button, Icon, List, ListItem } from 'react-native-elements'

const imageDir = 'http://wrg.baliprocom.com/src/public/img/';

class Warungs extends Component {
  static navigationOptions = {
    title: ({state}) => `${state.params.warung.warungNama}`,
  };
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

    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.thumbail} source={{uri: imageDir+params.warung.warungGambar }}>
            <View style={styles.ratingInfo}>
              <Icon type='font-awesome' name='heart-o' color='#fff'/>
              <Text style={{color:'white', fontSize: 16}}>
                &nbsp; {params.warung.warungRating}/5 dari {params.warung.warungTotalRate} pengguna
              </Text>
            </View>
          </Image>
          <View style={styles.infoContainer}>
              <Text style={styles.infoAlamat}>{params.warung.warungAlamat}</Text>
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
  },
  ratingInfo: {
    flexDirection: 'row',
    position: 'absolute',
    height: 30,
    padding: 5,
    borderRadius: 17.5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#3498db',
    bottom: 10,
    right: 10,
  }
});

export default Warungs;
