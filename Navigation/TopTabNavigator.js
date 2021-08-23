//AlaUneTopTabNavigator.js
import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TopTabAlaUne from '../Components/TopTabAlaUne';
import TopTabEnContinu from '../Components/TopTabEnContinu';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="TopTabAlaUne"
      screenOptions={{
        tabBarShowIcon: false,
        tabBarScrollEnabled: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'dodgerblue',
          height: 3,
          marginBottom: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          fontFamily: 'Helvetica',
          color: 'white',
          height: 40,
          textTransform: 'none',
        },

        tabBarItemStyle: {
          width: 'auto',
          height: 30,
        },
        tabBarIconStyle: {
          height: 0,
          marginTop: 0,
        },
        tabBarStyle: {
          backgroundColor: 'black',
          height: 30,
        },
        swipeEnabled: true,
      }}>
      <Tab.Screen
        name="TopTabAlaUne"
        component={TopTabAlaUne}
        options={{
          tabBarLabel: 'À la Une',
        }}
      />
      <Tab.Screen
        name="TopTabEnContinu"
        component={TopTabEnContinu}
        options={{
          tabBarLabel: 'En continu',
        }}
      />
    </Tab.Navigator>
  );
};
export default TopTabNavigator;
