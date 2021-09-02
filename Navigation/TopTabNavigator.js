//AlaUneTopTabNavigator.js
import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MainStackNavigator from '../Navigation/StackNavigator';
import RootStackNavigator from '../Navigation/RootStackNavigator';
import TopTabAlaUne from '../Components/TopTabAlaUne';
import MediaDetail from '../Components/MediaDetail';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="General"
      screenOptions={{
        tabBarShowIcon: false,
        tabBarScrollEnabled: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'dodgerblue',
          height: 3,
          marginBottom: 6,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'Futura-CondensedMedium',
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
        name="General"
        component={TopTabAlaUne}
        options={{
          tabBarLabel: 'General',
        }}
        initialParams={{category: 'general'}}
      />
      <Tab.Screen
        name="Business"
        component={MediaDetail}
        options={{
          tabBarLabel: 'Business',
        }}
        initialParams={{category: 'business'}}
      />
      <Tab.Screen
        name="MediaDetail"
        component={MediaDetail}
        options={{
          tabBarLabel: 'MediaDetail',
        }}
      />
      <Tab.Screen
        name="Entertainment"
        component={MediaDetail}
        options={{
          tabBarLabel: 'Entertainment',
        }}
        initialParams={{category: 'entertainment'}}
      />
      <Tab.Screen
        name="Health"
        component={MediaDetail}
        options={{
          tabBarLabel: 'Health',
        }}
        initialParams={{category: 'health'}}
      />
      <Tab.Screen
        name="Science"
        component={MediaDetail}
        options={{
          tabBarLabel: 'Science',
        }}
        initialParams={{category: 'science'}}
      />
      <Tab.Screen
        name="Sports"
        component={MediaDetail}
        options={{
          tabBarLabel: 'Sports',
        }}
        initialParams={{category: 'sports'}}
      />
      <Tab.Screen
        name="Technology"
        component={MediaDetail}
        options={{
          tabBarLabel: 'Technology',
        }}
        initialParams={{category: 'technology'}}
      />
    </Tab.Navigator>
  );
};
export default TopTabNavigator;
