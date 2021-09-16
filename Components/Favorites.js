//Favorites.js
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
import Modal from 'react-native-modal';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import MediaItem from '../Components/MediaItem';
import MediaDetail from '../Components/MediaDetail';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this._closeModal = this._closeModal.bind(this);
    this.state = {
      favoriteMedias: null,
      isLoading: true,
      mediasLoaded: false,
      modalVisible: false,
      media: {
        web_url: '',
      },
    };
    database()
      .ref('/user/favorites')
      .on('value', snapshot => {
        this.setState({favoriteMedias: snapshot.val()});
        console.log('User data: ', snapshot.val());
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

  _displayMediaDetail = media => {
    this.setState({modalVisible: true, media: media});
  };

  _closeModal() {
    this.setState({modalVisible: false});
  }

  _toggleFavorite(media) {
    //Action à faire si ajout à "Vos sélections"
    const user = auth().currentUser;
    this.props.user = user;
    console.log('user: ' + user);
    database()
      .ref('/user/favorites')
      .set({
        0: media,
      })
      .then(data => {
        //success callback
        console.log('data ', data);
      })
      .catch(error => {
        //error callback
        console.log('error ', error);
      });
    //  console.log('_toggleFavorite()' + media);
  }
  componentDidMount() {
    this.setState({
      isLoading: false,
    });
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
          data={this.state.favoriteMedias}
          renderItem={({item}) => (
            <MediaItem
              media={item.media}
              displayMediaDetail={this._displayMediaDetail}
              toggleFavorite={this._toggleFavorite}
            />
          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this._flatListItemSeparator}
          extraData={this.state.favoriteMedias}
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
    justifyContent: 'flex-end',
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
export default Favorites;
