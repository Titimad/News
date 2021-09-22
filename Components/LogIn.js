//LogIn.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SectionList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const mapStateToProps = state => {
  return {state};
};

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    //const {createUser, logInUser, logOff, closeModalParam} = this.props;
  }
  _createUser() {
    auth()
      .createUserWithEmailAndPassword('titimad64@icloud.com', 'password')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
  _logInUser() {
    auth()
      .signInWithEmailAndPassword('titimad64@icloud.com', 'password')
      .then(() => {
        database()
          .ref('/user/favorites/favoriteMedias')
          .once('value')
          .then(snapshot => {
            console.log(
              'snapshot.val() après then. = ' + JSON.stringify(snapshot.val()),
            );
            const action = {
              type: 'CONNECT',
              value: {
                user: auth().currentUser.email,
                favoriteMedias: snapshot.val(),
              },
            };
            this.props.dispatch(action);
          });
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
  _logOff() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  render() {
    const createUser = this.props.createUser;
    const logInUser = this.props.logInUser;
    const logOff = this.props.logOff;
    const closeModalParam = this.props.closeModalParam;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity title="Close" onPress={closeModalParam}>
          <Text style={{color: '#007AFF', fontSize: 20, padding: 20}}>
            Close
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Parameters</Text>
        <Button title="Create account" onPress={() => this._createUser()} />
        <Button title="Log in" onPress={() => this._logInUser()} />
        <Button title="Log off" onPress={() => this._logOff()} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'gainsboro',
    width: '100%',
    //justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 20,
    paddingTop: 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerList: {
    fontSize: 16,
    color: 'dimgrey',
    backgroundColor: 'gainsboro',
    paddingLeft: 20,
  },
  titleList: {
    fontSize: 16,
    marginLeft: 10,
  },
});
export default connect(mapStateToProps)(LogIn);
