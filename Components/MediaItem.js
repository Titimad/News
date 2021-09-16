//MediaItem.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
class MediaItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  _image() {
    if (this.props.media.multimedia[0] != undefined) {
      {
        return (
          <Image
            style={styles.image}
            source={{
              uri:
                'http://www.nytimes.com/' + this.props.media.multimedia[0].url,
            }}
            onError={({nativeEvent: {error}}) => console.log('error')}
          />
        );
      }
    }
  }
  _toggleFavorite(media, numberOfFavoriteMedias) {
    //Action à faire si ajout à "Vos sélections"
    database()
      .ref('/user/favorites')
      .once('value')
      .then(snapshot => {
        this.setState(
          {
            numberOfFavoriteMedias: snapshot.val().length,
          },
          () => {
            console.log('User data: ', snapshot.val());
            const user = auth().currentUser;
            const reference = '/user/favorites/' + snapshot.val().length;
            console.log('reference: ' + reference);
            console.log('user: ' + user);
            database()
              .ref(reference)
              .update({
                media,
              })
              .then(data => {
                //success callback
                console.log('data ', data);
              })
              .catch(error => {
                //error callback
                console.log('error ', error);
              });
          },
        );
      });

    //  console.log('_toggleFavorite()' + media);
  }
  render() {
    const {media, displayMediaDetail, numberOfFavoriteMedias} = this.props;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => displayMediaDetail(media)}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2, justifyContent: 'space-between'}}>
            <Text style={styles.title}>{media.headline.main}</Text>
          </View>
          <View style={{flex: 1}}>{this._image()}</View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={styles.category}>{media.section_name}</Text>
          <Ionicons
            name="bookmark-outline"
            color="lightgrey"
            size={24}
            onPress={() => this._toggleFavorite(media, numberOfFavoriteMedias)}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
export default MediaItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  category: {
    color: 'grey',
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  image: {
    width: 110,
    height: 69,
  },
});
