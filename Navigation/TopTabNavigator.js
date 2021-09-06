//TopTabNavigator.js
import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MediaFlatList from '../Components/MediaFlatList';
import MediaDetail from '../Components/MediaDetail';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Front Page"
      screenOptions={{
        tabBarShowIcon: false,
        tabBarScrollEnabled: true,
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
        name="Front Page"
        component={MediaFlatList}
        options={{
          tabBarLabel: 'Front Page',
        }}
        initialParams={{category: 'Front Page'}}
      />
      <Tab.Screen
        name="Business"
        component={MediaFlatList}
        options={{
          tabBarLabel: 'Business',
        }}
        initialParams={{category: 'Business'}}
      />
      <Tab.Screen
        name="Fashion & Style"
        component={MediaFlatList}
        options={{
          tabBarLabel: 'Fashion & Style',
        }}
        initialParams={{category: 'Fashion & Style'}}
      />
      <Tab.Screen
        name="Health"
        component={MediaFlatList}
        options={{
          tabBarLabel: 'Health',
        }}
        initialParams={{category: 'Health'}}
      />
      <Tab.Screen
        name="Science"
        component={MediaFlatList}
        options={{
          tabBarLabel: 'Science',
        }}
        initialParams={{category: 'Science'}}
      />
      <Tab.Screen
        name="Sports"
        component={MediaFlatList}
        options={{
          tabBarLabel: 'Sports',
        }}
        initialParams={{category: 'Sports'}}
      />
      <Tab.Screen
        name="Technology"
        component={MediaFlatList}
        options={{
          tabBarLabel: 'Technology',
        }}
        initialParams={{category: 'Technology'}}
      />
    </Tab.Navigator>
  );
};
export default TopTabNavigator;
