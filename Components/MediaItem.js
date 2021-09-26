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

import {connect} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

const mapStateToProps = state => {
  return {state};
};

class MediaItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _iconFavorite(mediaFavorite, media) {
    //Renvoie l'icône à afficher si article favori ou params
    if (mediaFavorite) {
      return (
        <View>
          <Ionicons
            name="bookmark"
            color="lightgrey"
            size={24}
            onPress={() => this._toggleFavorite(media)}
          />
        </View>
      );
    }
    return (
      <View>
        <Ionicons
          name="bookmark-outline"
          color="lightgrey"
          size={24}
          onPress={() => this._toggleFavorite(media)}
        />
      </View>
    );
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

  _toggleFavorite(media) {
    //Action à faire si boutton Favoris appuyé
    //    console.log('_toggleFavorite exécutée');
    console.log('_toggleFavorite props = ' + JSON.stringify(this.props));
    let numberOfFavorites;
    if (this.props.state.favoriteMedias == null) {
      numberOfFavorites = 0;
    } else {
      numberOfFavorites = this.props.state.favoriteMedias.length;
    }
    console.log('numberOfFavorites = ' + numberOfFavorites);
    const user = auth().currentUser;
    console.log('User UID = ' + user.uid);
    const ref = '/' + user.uid;
    console.log('Dans MediaItem, _toggleFavorite, ref = ' + ref);
    const action = {
      type: 'TOGGLE_FAVORITE',
      value: {media: media, numberOfFavorites: numberOfFavorites, ref: ref},
    };
    //    console.log('Dans _toggleFavorite, media = ' + media._id);
    this.props.dispatch(action);
    //    console.log('action TOGGLE_FAVORITE appelée');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate de MediaItem executé');
    //  console.log('this.props.favoritesArticle = ' + this.props.favoritesArticle);
  }
  render() {
    //  console.log('MediaItem props = ' + this.props);
    const {media, displayMediaDetail, mediaFavorite} = this.props;
    //  console.log('MediaItem props = ' + this.props);
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
          {this._iconFavorite(mediaFavorite, media)}
        </View>
      </TouchableOpacity>
    );
  }
}
export default connect(mapStateToProps)(MediaItem);

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
