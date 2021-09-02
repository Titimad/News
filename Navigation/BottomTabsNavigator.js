//BottomTabsNavigator.js
import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MainStackNavigator from '../Navigation/StackNavigator';
import BottomTabVosSelection from '../Components/BottomTabVosSelection';
import BottomTabMenu from '../Components/BottomTabMenu';

const Tab = createBottomTabNavigator();

const InitialIcon = ({letter, color, size}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        width: 30,
        height: 30,
      }}>
      <Text
        style={{
          color: color,
          fontSize: size,
          fontFamily: 'Lucida Blackletter',
        }}>
        {letter}
      </Text>
    </View>
  );
};

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="A la Une"
      screenOptions={{
        headerShown: false,
        tabBarShowIcon: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          fontFamily: 'Helvetica',
        },

        tabBarItemStyle: {
          width: 120,
        },
        tabBarStyle: {
          backgroundColor: 'white',
        },
        swipeEnabled: false,
      }}>
      <Tab.Screen
        name="General"
        component={MainStackNavigator}
        options={{
          tabBarLabel: 'General',
          tabBarIcon: ({color, size}) => (
            <InitialIcon letter="N" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Your selections"
        component={BottomTabVosSelection}
        options={{
          tabBarLabel: 'Your selections',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-bookmarks-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={BottomTabMenu}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="menu-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabsNavigator;
