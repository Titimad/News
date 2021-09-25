//LogIn.js
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SectionList,
  StatusBar,
  SafeAreaView,
  TextInput,
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
    this.state = {user: '', email: '', password: '', initializing: true};
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
    console.log('email = ' + this.state.email);
    console.log('password = ' + this.state.password);
    //console.log(testConnect);
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
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
  render() {
    console.log('LogIn render');
    const closeModalParam = this.props.closeModalParam;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity title="Close" onPress={closeModalParam}>
          <Text style={{color: '#007AFF', fontSize: 20, padding: 20}}>
            Close
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>Log In</Text>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: 'lightgrey',
          }}
        />
        <Text>
          To take full advantage of the application on all your devices, log in.
        </Text>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: 'lightgrey',
          }}
        />
        <TextInput
          style={styles.textInput}
          keyboardType="default"
          returnKeyType={'done'}
          placeholder="E-mail"
          onChangeText={text => this.setState({email: text})}
          autoCapitalize="none"
        />
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: 'lightgrey',
          }}
        />
        <TextInput
          style={styles.textInput}
          keyboardType="default"
          returnKeyType={'done'}
          placeholder="Password"
          onChangeText={text => this.setState({password: text})}
          autoCapitalize="none"
        />
        {/*<Button title="Create account" onPress={() => this._createUser()} />
        <Button title="Log off" onPress={() => this._logOff()} />*/}
        <Button
          title="Log in"
          onPress={() => {
            console.log('Dans LogIn, Button onPress: ' + this.state.email);
            this._logInUser(this.state.email, this.state.password);
            database()
              .ref('/user/favorites/favoriteMedias')
              .once('value')
              .then(snapshot => {
                console.log(
                  'Dans LogIn, snapshot.val() après then. = ' +
                    JSON.stringify(snapshot.val()),
                );
                const action = {
                  type: 'CONNECT',
                  value: {
                    user: this.state.email,
                    favoriteMedias: snapshot.val(),
                  },
                };
                this.props.dispatch(action);
              });
            //  closeModalParam;
          }}
        />
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
  textInput: {
    width: '100%',
    height: 50,
    fontSize: 16,
    backgroundColor: 'white',
    padding: 10,
  },
});
export default connect(mapStateToProps)(LogIn);
