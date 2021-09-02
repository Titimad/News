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
  Dimensions,
  ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getMediaFromApiWithSearchedText} from '../API/MediaStackApi';
import DATA from '../Helpers/Data';
//this.state.data

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
      <Ionicons
        name="bookmark-outline"
        color="lightgrey"
        size={24}
        onPress={() => this._toggleFavorite()}
      />
    </View>
  </View>
);
const renderItem = ({item}) => (
  <Item title={item.title} image={item.image} category={item.category} />
);

class TopTabAlaUneBis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {medias: []};
    this._loadMedias();
  }
  FlatListFirstItem() {
    return (
      <View>
        <ImageBackground
          style={styles.imageAlaUne}
          source={{uri: DATA.data[0].image}}>
          <LinearGradient
            colors={['transparent', 'black']}
            start={{x: 0.0, y: 0.52}}
            end={{x: 0.0, y: 1.0}}
            locations={[0, 0.5]}
            style={styles.box}>
            <Text style={styles.titleAlaUne}>{DATA.data[0].title}</Text>
            <View style={{alignItems: 'flex-end'}}>
              <Ionicons name="bookmark-outline" color="lightgrey" size={24} />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
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
    getMediaFromApiWithSearchedText(this.props.route.params.category).then(
      data => {
        this.setState({medias: data.data});
      },
    );
    console.log('Fin de _loadMedias');
  }
  _toggleFavorite() {
    //Action à faire si ajout à "Vos sélections"
    console.log('_toggleFavorite()');
  }
  //  static getDerivedStateFromProps() {}
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.medias}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          ListHeaderComponent={this.FlatListFirstItem}
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
  titleAlaUne: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'AmericanTypewriter-Bold',
  },
  category: {
    color: 'lightgrey',
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  image: {
    width: 110,
    height: 69,
  },
  imageAlaUne: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    margin: 0,
  },
  box: {
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
});
export default TopTabAlaUneBis;
