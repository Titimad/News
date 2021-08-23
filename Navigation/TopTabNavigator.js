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
        tabBarIndicatorStyle: {backgroundColor: 'dodgerblue', height: 4},
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          fontFamily: 'Helvetica',
          color: 'white',
          marginTop: 0,
        },

        tabBarItemStyle: {
          width: 'auto',
          height: 'auto',
        },
        tabBarStyle: {
          backgroundColor: 'black',
          height: 'auto',
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
