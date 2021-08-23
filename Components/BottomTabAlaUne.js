//BottomTabAlaUne.js
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

//import AlaUneTopTabNavigator from '../Navigation/AlaUneTopTabNavigator';

const BottomTabAlaUne = () => {
  return (
    <View style={styles.container}>
      <Text>Coucou</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'space-between',
  },
});
export default BottomTabAlaUne;
