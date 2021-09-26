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
/*import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';*/
//import {AppleButton} from '@invertase/react-native-apple-authentication';
//import {appleAuth} from '@invertase/react-native-apple-authentication';

const mapStateToProps = state => {
  return {state};
};
/*
function AppleSignIn() {
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 160,
        height: 45,
      }}
      onPress={() =>
        onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))
      }
    />
  );
}

async function onAppleButtonPress() {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned';
  }

  // Create a Firebase credential from the response
  const {identityToken, nonce} = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
}


GoogleSignin.configure({
  webClientId: '',
});

function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  );
}

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
*/
class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: '', email: '', password: '', initializing: true};
    //const {createUser, logInUser, logOff, closeModalParam} = this.props;
  }
  _createUser() {
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log('User account created & signed in!');
        const user = auth().currentUser;
        console.log('User UID = ' + user.uid);
        const ref = '/' + user.uid;
        database()
          .ref(ref)
          .set({
            favoriteMedias: '',
          })
          .then(() => {
            console.log('Data set.');
            console.log('Dans LogIn, _createUser, user = ' + user);
            const action = {
              type: 'CREATE_ACCOUNT',
              value: {
                user: user.uid,
                favoriteMedias: [],
              },
            };
            this.props.dispatch(action);
            //    return user;
          });
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
    const modalType = this.props.type;
    console.log('Dans LogIn, modalType = ' + modalType);
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity title="Close" onPress={closeModalParam}>
          <Text style={{color: '#007AFF', fontSize: 20, padding: 20}}>
            Close
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>{modalType}</Text>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: 'lightgrey',
          }}
        />
        <Text style={{padding: 20}}>
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
          secureTextEntry={true}
          style={styles.textInput}
          keyboardType="default"
          returnKeyType={'done'}
          placeholder="Password"
          onChangeText={text => this.setState({password: text})}
          autoCapitalize="none"
        />
        <Text>{'\n'}</Text>
        {/*<Button title="Create account" onPress={() => this._createUser()} />
        <Button title="Log off" onPress={() => this._logOff()} />*/}
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={closeModalParam => {
            closeModalParam;
            console.log('Dans LogIn, Button onPress: ' + this.state.email);
            console.log(
              'Dans LogIn, au début de onPress de Log In, closeModalParam = ' +
                closeModalParam,
            );
            if (modalType == 'Log In') {
              this._logInUser(this.state.email, this.state.password);
              const ref = '/' + 'titimad' + '/favorites/favoriteMedias';
              console.log('Dans LogIn, ref = ' + ref);
              database()
                .ref(ref)
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
                  console.log(
                    'Dans LogIn, à la fin de onPress de Log In, closeModalParam = ' +
                      closeModalParam,
                  );
                  closeModalParam;
                });
            } else if (modalType == 'Create an account') {
              this._createUser(this.state.email, this.state.password);
              //  const user = auth().currentUser;
            }
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: 'white',
              fontWeight: 'bold',
            }}>
            {modalType}
          </Text>
        </TouchableOpacity>
        {/*AppleSignIn()*/}
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
  createAccountButton: {
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    margin: 10,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
export default connect(mapStateToProps)(LogIn);
