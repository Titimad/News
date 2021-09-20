//MediaFlatList.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {connect} from 'react-redux';

import Modal from 'react-native-modal';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {getMediaFromApiWithSearchedText} from '../API/MediaStackApi';

import MediaItem from '../Components/MediaItem';
import FirstMediaItem from '../Components/FirstMediaItem';
import MediaDetail from '../Components/MediaDetail';

const mapStateToProps = state => {
  return {state};
};

class MediaFlatList extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      'Dans MediaFlatList, constructor, this.props.state = ' +
        JSON.stringify(this.props.state),
    );
    this._closeModal = this._closeModal.bind(this);
    this.state = {
      medias: undefined,
      favoriteMedias: null,
      isLoading: true,
      mediasLoaded: false,
      modalVisible: false,
      media: {
        web_url: '',
      },
    };
    function testDataBaseEmpty(dataBase) {
      if (dataBase == null) {
        return 0;
      } else {
        return dataBase.length;
      }
    }
    /*  database()
      .ref('/user/favorites')
      .on('value', snapshot => {
        this.setState({
          favoriteMedias: snapshot.val(),
          numberOfFavoriteMedias: testDataBaseEmpty(snapshot.val()),
        });
        console.log('User data: ', snapshot.val());
      });*/
    database()
      .ref('/user/favorites/favoriteMedias')
      .once('value')
      .then(snapshot => {
        console.log(
          'snapshot.val() après then. = ' + JSON.stringify(snapshot.val()),
        );

        //      result = snapshot.val();
        //      console.log('result =  ' + result);
        const action = {type: 'INIT', value: snapshot.val()};
        this.props.dispatch(action);
      });
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _flatListItemSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'lightgrey',
        }}
      />
    );
  }

  _loadMedias() {
    const category = this.props.route.params.category;
    this.setState({isLoading: true});
    getMediaFromApiWithSearchedText(category).then(data => {
      this.setState({
        medias: data.response.docs,
        isLoading: false,
      });
    });
  }

  _displayMediaDetail = media => {
    this.setState({modalVisible: true, media: media});
  };

  _firstMediaItemChoice() {
    if (this.state.medias == undefined) {
      return undefined;
    } else {
      var id = Math.trunc(new Date().getMinutes() / 6);
      while (this.state.medias[id].multimedia[0] == undefined) {
        id = Math.trunc(10 * Math.random());
      }
      return this.state.medias[id];
    }
  }
  _mediaFavorite(item) {
    console.log('this.props.state = ' + JSON.stringify(this.props.state));
    if (this.props.state == undefined) {
      //Test si le media est en favori. Renvoie l'index ou -1
      const favoriteMediaIndex = this.props.state.favoriteMedias.findIndex(
        itemOfFavoriteMedias => itemOfFavoriteMedias._id === item._id,
      );
      //  console.log('_mediaFavorite executée');
      if (favoriteMediaIndex != -1) {
        return true;
      } else {
        console.log('_mediaFavorite = ' + false);
        return false;
      }
    } else {
      return false;
    }
  }
  _closeModal() {
    this.setState({modalVisible: false});
  }
  _lectureDataBase() {
    console.log('function lectureDataBase read');
    //  var result;
    database()
      .ref('/user/favorites')
      .once('value')
      .then(snapshot => {
        console.log('snapshot.val() après then. = ' + snapshot.val());
        //      result = snapshot.val();
        //      console.log('result =  ' + result);
        this.setState({
          favoriteMedias: snapshot.val(),
        });
      });
  }
  async componentDidMount() {
    //    this.props.dataBase =
    /*  await this._lectureDataBase();
    media = this.state.favoriteMedias;
    const action = {type: 'TOGGLE_FAVORITE', value: media};
    this.props.dispatch(action);*/
    await this._loadMedias();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <GestureRecognizer
          onSwipeUp={() => this.setState({modalVisible: false})}
          onSwipeDown={() => this.setState({modalVisible: false})}>
          <Modal
            style={styles.modalView}
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setState({modalVisible: false});
            }}>
            <MediaDetail
              web_url={this.state.media.web_url}
              closeModal={this._closeModal}
            />
          </Modal>
        </GestureRecognizer>
        <FlatList
          data={this.state.medias}
          renderItem={({item}) => (
            <MediaItem
              media={item}
              displayMediaDetail={this._displayMediaDetail}
              mediaFavorite={this._mediaFavorite(item)}
            />
          )}
          keyExtractor={item => item._id}
          ListHeaderComponent={() => (
            <FirstMediaItem
              media={this._firstMediaItemChoice()}
              displayMediaDetail={this._displayMediaDetail}
              category={this.props.route.params.category}
            />
          )}
          ItemSeparatorComponent={this._flatListItemSeparator}
        />
        {this._displayLoading()}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 0,
    backgroundColor: 'yellow',
    borderRadius: 20,
    padding: 0,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '100%',
    height: '100%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default connect(mapStateToProps)(MediaFlatList);
