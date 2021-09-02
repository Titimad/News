//RootStackNavigator.js
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TopTabAlaUne from '../Components/TopTabAlaUne';
import TopTabNavigator from '../Navigation/TopTabNavigator';
import MediaDetail from '../Components/MediaDetail';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Group>
        <RootStack.Screen
          name="TopTabAlaUne"
          component={TopTabAlaUne}
          options={{}}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen name="MediaDetail" component={MediaDetail} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
export default RootStackNavigator;
