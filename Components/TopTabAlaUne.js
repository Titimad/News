//TopTabAlaUne.js
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

import {getMediaFromApiWithSearchedText} from '../API/MediaStackApi';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const renderItem = ({item}) => <Item title={item.title} />;

class TopTabAlaUne extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {medias: []};
  }
  _loadMedias() {
    console.log('Execution de _loadMedias');
    getMediaFromApiWithSearchedText().then(data => {
      this.setState({medias: data.data});
    });
    console.log('Props:' + this.data);
    console.log('Fin de _loadMedias');
  }
  render() {
    this._loadMedias();
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.medias}
          renderItem={renderItem}
          keyExtractor={item => item.title}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: 'lightgrey',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default TopTabAlaUne;
