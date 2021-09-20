//Favorites.js
import React, {useState, useEffect} from 'react';
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

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MediaItem from '../Components/MediaItem';
import MediaDetail from '../Components/MediaDetail';

const mapStateToProps = state => {
  return {state};
};

var userNow = auth().currentUser;

function IconUser() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    console.log('User: ' + user.email);
  }, []);
  if (initializing) return null;
  //  console.log('Dans LoginApp, User = ' + user);
  if (!user) {
    userNow = user;
    console.log('Pas connecté' + userNow);
    return (
      <View>
        <FontAwesome name="user-times" color="black" size={24} />
      </View>
    );
  } else {
    userNow = user;
    console.log('Connecté' + userNow);
    return (
      <View>
        <FontAwesome name="user-circle-o" color="black" size={24} />
      </View>
    );
  }
}

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this._closeModal = this._closeModal.bind(this);
    this._onAuthStateChanged = this._onAuthStateChanged.bind(this);
    this._user = this._user.bind(this);
    this.state = {
      favoriteMedias: null,
      isLoading: true,
      mediasLoaded: false,
      modalVisible: false,
      initializing: true,
      user: null,
      media: {
        web_url: '',
      },
    };

    database()
      .ref('/user/favorites')
      .on('value', snapshot => {
        this.setState({
          favoriteMedias: snapshot.val(),
        });
        console.log('User data: ', snapshot.val());
      });
  }
  _user() {
    // Set an initializing state whilst Firebase connects

    // Handle user state changes

    if (this.state.initializing) return null;
    //  console.log('Dans LoginApp, User = ' + user);
    if (!user) {
      return null;
    }
    return user;
  }
  _onAuthStateChanged(user) {
    this.setState({user: user});
    if (this.state.initializing) this.setState({initializing: false});
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

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
    /*
    const subscriber = auth().onAuthStateChanged(
      this._onAuthStateChanged(user),
    );
    return subscriber; // unsubscribe on unmount
    console.log('User: ' + user.email);*/
  }
  componentDidUpdate() {
    /*
    const subscriber = auth().onAuthStateChanged(
      this._onAuthStateChanged(user),
    );
    return subscriber; // unsubscribe on unmount
    console.log('User: ' + user.email);*/
  }
  render() {
    console.log('render Favorites');
    console.log('currentUser = ' + userNow);
    console.log(
      'this.props.state.favoriteMedias = ' + this.props.state.favoriteMedias,
    );
    if (userNow != null) {
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
            data={this.props.state.favoriteMedias}
            renderItem={({item}) => (
              <MediaItem
                media={item}
                displayMediaDetail={this._displayMediaDetail}
                mediaFavorite={true}
              />
            )}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={this._flatListItemSeparator}
            ListEmptyComponent=<View style={styles.emptyList}>
              <Ionicons name="bookmarks-outline" color="lightgrey" size={48} />
              <Text style={{textAlign: 'center', fontSize: 16}}>
                {'\n'}You have not yet added any items to{'\n'}your selections
              </Text>
            </View>
          />
          <IconUser />
          {this._displayLoading()}
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView>
          <Text>Pas connecté !</Text>
        </SafeAreaView>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
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
export default connect(mapStateToProps)(Favorites);
