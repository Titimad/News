//StackNavigator.js
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import TopTabNavigator from '../Navigation/TopTabNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

const MainStackNavigator = () => {
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

export default MainStackNavigator;
