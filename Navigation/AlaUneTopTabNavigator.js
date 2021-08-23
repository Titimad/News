//AlaUneTopTabNavigator.js
import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TopTabAlaUne from '../Components/TopTabAlaUne';
import TopTabEnContinu from '../Components/TopTabEnContinu';

const Tab = createMaterialTopTabNavigator();

const AlaUneTopTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TopTabAlaUne" component={TopTabAlaUne} />
      />
    </Tab.Navigator>
  );
};

export default AlaUneTopTabNavigator;
