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
  TouchableOpacity,
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
import LogIn from './LogIn';

const mapStateToProps = state => {
  return {state};
};

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this._closeModalLogIn = this._closeModalLogIn.bind(this);
    this._closeModalMediaDetail = this._closeModalMediaDetail.bind(this);
    this.state = {
      isLoading: true,
      mediasLoaded: false,
      modalVisibleLogIn: false,
      modalMediaDetailVisible: false,
      modalType: '',
      initializing: true,
      media: {
        web_url: '',
      },
    };
    if (this.props.state.user != null) {
      const user = auth().currentUser;
      console.log('User UID = ' + user.uid);
      const ref = '/' + user.uid + '/favoriteMedias';
      database()
        .ref(ref)
        .once('value')
        .then(snapshot => {
          console.log(
            'Dans Favorites, snapshot.val() après then. = ' +
              JSON.stringify(snapshot.val()),
          );
          const action = {
            type: 'CONNECT',
            value: {
              user: user.uid,
              favoriteMedias: snapshot.val(),
            },
          };
          this.props.dispatch(action);
        });
    }
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
    this.setState({modalMediaDetailVisible: true, media: media});
  };
  _openModalLogIn(modalType) {
    this.setState({modalVisibleLogIn: true, modalType: modalType});
  }
  _closeModalLogIn() {
    console.log('_closeModalParam de Favorites');
    this.setState({modalVisibleLogIn: false});
  }
  _closeModalMediaDetail() {
    console.log('_closeModalConnected de Favorites');
    this.setState({modalMediaDetailVisible: false});
  }
  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }
  componentDidUpdate() {}
  render() {
    console.log('render Favorites');
    console.log(
      'this.props.state.user = ' + JSON.stringify(this.props.state.user),
    );
    if (this.props.state.user != null) {
      console.log('Dans Favorites, testConnect renvoie true');
      return (
        <SafeAreaView style={styles.container}>
          <GestureRecognizer
            onSwipeUp={() => this.setState({modalMediaDetailVisible: false})}
            onSwipeDown={() => this.setState({modalMediaDetailVisible: false})}>
            <Modal
              style={styles.modalView}
              animationType="slide"
              transparent={false}
              visible={this.state.modalMediaDetailVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                this.setState({modalMediaDetailVisible: false});
              }}>
              <MediaDetail
                web_url={this.state.media.web_url}
                closeModalMediaDetail={this._closeModalMediaDetail}
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
          {this._displayLoading()}
        </SafeAreaView>
      );
    } else {
      console.log('Dans Favorites, testConnect ne renvoie pas true');
      return (
        <SafeAreaView style={styles.emptyList}>
          <Modal
            style={styles.modalView}
            animationType="slide"
            animationIn={'slideInLeft'}
            animationOut="slideOutRight"
            swipeDirection={['right']}
            transparent={false}
            visible={this.state.modalVisibleLogIn}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setState({modalVisibleLogIn: false});
            }}>
            <LogIn
              closeModalLogIn={this._closeModalLogIn}
              type={this.state.modalType}
            />
          </Modal>
          <Text style={{textAlign: 'center', fontSize: 16}}>
            {'\n'}To access your selections{'\n'}you need to be connected to
            your account{'\n'}
          </Text>
          <Ionicons name="bookmarks-outline" color="lightgrey" size={96} />
          <Text style={{textAlign: 'center', fontSize: 16, padding: 8}}>
            {'\n'}You do not have an account ?
          </Text>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => {
              this._openModalLogIn('Create an account');
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold',
              }}>
              Create an account
            </Text>
          </TouchableOpacity>
          <Text style={{paddingTop: 20, textAlign: 'center', fontSize: 16}}>
            {'\n'}You have already an account ?
          </Text>

          <Text
            style={{
              padding: 10,
              textAlign: 'center',
              fontSize: 16,
              color: 'dodgerblue',
              fontWeight: 'bold',
            }}
            onPress={() => {
              this._openModalLogIn('Sign in');
            }}>
            Sign in
          </Text>
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
  createAccountButton: {
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
export default connect(mapStateToProps)(Favorites);
