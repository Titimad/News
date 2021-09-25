//IconUser.js
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import {useSelector, useDispatch} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

function testConnect() {
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

  if (initializing) return false;

  if (!user) {
    return false;
  }

  return true;
}

const IconUser = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log('App: Mise à jour du state user = ' + user);
    setUser(user);
    if (initializing) {
      console.log('Avant mise à jour du state initializing = ' + initializing);
      setInitializing(false);
      console.log('Après mise à jour du state initializing = ' + initializing);
    }
    console.log('App: Fin de _onAuthStateChanged');
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(
      'Dans App/function onAuthStateChanged, subscriber = ' + subscriber,
    );
    return subscriber; // unsubscribe on unmount
    console.log('User: ' + user.email);
  }, []);
  if (initializing) {
    console.log('initializing : return null');
    return null;
  }
  //  console.log('Dans LoginApp, User = ' + user);
  if (!user) {
    console.log(
      'App: test de !user. Pas connecté. initializing = ' + initializing,
    );
    return (
      <View>
        <FontAwesome name="user-times" color="white" size={24} />
      </View>
    );
  }
  console.log('Connecté');
  const dispatch = useDispatch();
  dispatch({type: 'CONNECT', value: 'test'});
  return (
    <View>
      <FontAwesome name="user-circle-o" color="white" size={24} />
    </View>
  );
};
export default IconUser;
