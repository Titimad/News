//BottomTabsNavigator.js
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

//import MainStackNavigator from '../Navigation/StackNavigator';
import TopTabNavigator from '../Navigation/TopTabNavigator';
import ParametersDetail from '../Components/ParametersDetail';
import Favorites from '../Components/Favorites';
import BottomTabMenu from '../Components/BottomTabMenu';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitle: '',
  headerTintColor: 'white',
  headerTitleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lucida Blackletter',
  },
};
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

const BottomTabsNavigator = user => {
  console.log('user dans BottomTabsNavigator =' + JSON.stringify(user));
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
        component={TopTabNavigator}
        options={{
          tabBarLabel: 'General',
          tabBarIcon: ({color, size}) => (
            <InitialIcon letter="N" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Your selections"
        component={Favorites}
        options={{
          tabBarLabel: 'Your selections',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-bookmarks-outline" color={color} size={size} />
          ),
        }}
        initialParams={{user: user}}
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
/*const MainStackNavigator = closeModalParam => {
  return (
    <Stack.Navigator
      initialRouteName="The News"
      screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="The News"
        component={TopTabNavigator}
        options={{
          headerLeft: props => (
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
          ),
          headerRight: props => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  <ParametersDetail />;
                  this.props.closeModalParam;
                  console.log('Boutton user');
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
          ),
        }}
      />
    </Stack.Navigator>
  );
};
*/
export default BottomTabsNavigator;
