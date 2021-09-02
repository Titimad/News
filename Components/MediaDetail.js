//MediaDetail.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const MediaDetail = media => {
  console.log('media = ' + media);

  //  console.log(this.props.media.title);
  return (
    //  <Text>{this.props.route.params.media.title}</Text>
    //  <Text>{this.props.route.params.media.description}</Text>
    //  <Text>{this.props.route.params.media.source}</Text>

    <SafeAreaView style={styles.modalView}>
      <Image />
      <Text>{media.title}</Text>
      <Text>Contenu</Text>
      <Text>Dans la même rubrique</Text>
      <Text>Réactions</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 0,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default MediaDetail;
