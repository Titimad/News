/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabsNavigator from './Navigation/BottomTabsNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ParametersDetail from './Components/ParametersDetail';

import auth from '@react-native-firebase/auth';

function LoginApp() {
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
  }, []);
  if (initializing) return null;
  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this._closeModalParam = this._closeModalParam.bind(this);
    this.state = {modalVisible: false};
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
  _openModalParam() {
    this.setState({modalVisible: true});
  }
  _closeModalParam() {
    this.setState({modalVisible: false});
  }
  componentDidMount() {
    /*auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
    auth()
      .createUserWithEmailAndPassword('titimad64@icloud.com', '')
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
      });*/
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/*<LoginApp />*/}
        <Modal
          style={styles.modalView}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setState({modalVisible: false});
          }}>
          <LoginApp />
          <Button title="Create account" onPress={() => this._createUser()} />
          <Button title="Log in" onPress={() => this._logInUser()} />
          <Button title="Log off" onPress={() => this._logOff()} />
          <TouchableOpacity onPress={() => this._closeModalParam()}>
            <Text>FERMER</Text>
          </TouchableOpacity>
        </Modal>
        <StatusBar barStyle={'dark-content'} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'black',
          }}>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
                fontFamily: 'Lucida Blackletter',
              }}>
              The News
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this._openModalParam();
              }}>
              <FontAwesome name="user-circle-o" color="white" size={24} />
            </TouchableOpacity>
            <View
              style={{
                marginLeft: 10,
                backgroundColor: 'goldenrod',
                padding: 8,
                borderRadius: 6,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                  fontFamily: 'Helvetica',
                }}>
                Subscribe
              </Text>
            </View>
          </View>
        </View>
        <NavigationContainer>
          <BottomTabsNavigator />
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    //    marginTop: 32,
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
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
