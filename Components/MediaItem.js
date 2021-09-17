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
  _toggleFavorite(media) {
    //Action à faire si boutton Favoris appuyé
    //Si ajout...
    console.log('Dans _toggleFavorite, media = ' + media);
    function testDataBaseEmpty(dataBase) {
      if (dataBase == null) {
        return 0;
      } else {
        return dataBase.length;
      }
    }
    database()
      .ref('/user/favorites')
      .once('value')
      .then(snapshot => {
        this.setState(
          {
            favoriteMedias: snapshot.val(),
            numberOfFavoriteMedias: testDataBaseEmpty(snapshot.val()),
          },
          () => {
            console.log('User data: ', snapshot.val());
            const user = auth().currentUser;

            var mediaExisting = false;

            console.log('user: ' + user);
            if (this.state.numberOfFavoriteMedias != 0) {
              var i = 0;
              console.log(
                'this.state.numberOfFavoriteMedias = ' +
                  this.state.numberOfFavoriteMedias,
              );
              while (i < this.state.numberOfFavoriteMedias) {
                console.log('Dans while, i = ' + i);
                if (this.state.favoriteMedias[i]._id == media._id) {
                  //supprimer car déjà présent
                  console.log('On supprime');
                  var favoriteMedias = this.state.favoriteMedias;
                  favoriteMedias.splice(i, 1);
                  console.log(
                    'favoriteMedias après suppression = ' + favoriteMedias,
                  );
                  database()
                    .ref('/user')
                    .set({
                      favorites: favoriteMedias,
                    })
                    .then(data => {
                      //success callback
                      console.log('data ', data);
                    })
                    .catch(error => {
                      //error callback
                      console.log('error ', error);
                    });
                  mediaExisting = true;
                  break;
                }
                i++;
              }
              console.log('Après while, i = ' + i);
            } else {
              mediaExisting = false;
            }
            if (!mediaExisting) {
              //Ajouter le média car pas présent
              var favoriteMedias = [];
              console.log('On ajoute');
              const reference = media._id.slice(14);
              console.log('reference: ' + reference);
              //Reconstruction du json
              //const mediaAjout = media._id.slice(14) + ': ' + media;
              //console.log('mediaAjout = ' + mediaAjout);
              if (this.state.favoriteMedias == null) {
                favoriteMedias = [];
              } else {
                favoriteMedias = this.state.favoriteMedias;
              }

              favoriteMedias.push(media);
              database()
                .ref('/user')
                .update({
                  favorites: favoriteMedias,
                })
                .then(data => {
                  //success callback
                  console.log('data ', data);
                })
                .catch(error => {
                  //error callback
                  console.log('error ', error);
                });
            }
          },
        );
      });

    //  console.log('_toggleFavorite()' + media);
  }
  render() {
    const {media, displayMediaDetail} = this.props;
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
            onPress={() => this._toggleFavorite(media)}
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
