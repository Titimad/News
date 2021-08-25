//TopTabAlaUne.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {getMediaFromApiWithSearchedText} from '../API/MediaStackApi';
//import DATA from '../Helpers/Data';

const Item = ({title, image, category}) => (
  <View style={styles.item}>
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 2, justifyContent: 'space-between'}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{flex: 1}}>
        <Image style={styles.image} source={{uri: image}} />
      </View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      }}>
      <Text style={styles.category}>{category}</Text>
      <Ionicons name="bookmark-outline" color="lightgrey" size={24} />
    </View>
  </View>
);
const renderItem = ({item}) => (
  <Item title={item.title} image={item.image} category={item.category} />
);

class TopTabAlaUne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {medias: []};
    this._loadMedias();
  }

  FlatListItemSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'lightgrey',
        }}
      />
    );
  }
  _loadMedias() {
    console.log('Execution de _loadMedias');
    getMediaFromApiWithSearchedText().then(data => {
      this.setState({medias: data.data});
    });
    console.log('Fin de _loadMedias');
  }
  //  static getDerivedStateFromProps() {}
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.medias}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={this.FlatListItemSeparator}
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
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  category: {
    color: 'lightgrey',
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  image: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 110,
    height: 69,
    margin: 5,
  },
});
export default TopTabAlaUne;
