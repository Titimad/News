//TopTabAlaUne.js
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const TopTabAlaUne = () => {
  return (
    <View style={styles.container}>
      <Text>À la Une</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'space-between',
  },
});
export default TopTabAlaUne;
