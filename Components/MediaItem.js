//MediaItem.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
var opacity = 1;
class MediaItem extends React.Component {
  render() {
    const {media, displayMediaDetail} = this.props;
    var uriImage = (uriImage = {
      uri: 'http://www.nytimes.com/images/2021/09/01/nyregion/01kelly/merlin_193409475_bad6f472-64e2-40e6-99ed-83fe0c01703a-articleLarge.jpg',
    });
    //console.log(media.multimedia[0]);
    if (media.multimedia[0] == undefined) {
      {
        //    console.log("Pas d'image");
        uriImage = {
          uri: 'http://www.nytimes.com/images/2021/09/01/nyregion/01kelly/merlin_193409475_bad6f472-64e2-40e6-99ed-83fe0c01703a-articleLarge.jpg',
        };
        opacity = 0;
      }
    } else {
      {
        //console.log('Image présente');
        uriImage = {
          //uri: 'http://www.nytimes.com/images/2021/09/01/nyregion/01kelly/merlin_193409475_bad6f472-64e2-40e6-99ed-83fe0c01703a-articleLarge.jpg',
          uri: 'http://www.nytimes.com/' + media.multimedia[0].url,
        };
      }
    }
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => displayMediaDetail(media)}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2, justifyContent: 'space-between'}}>
            <Text style={styles.title}>{media.headline.main}</Text>
          </View>
          <View style={{flex: 1}}>
            <Image
              style={styles.image}
              source={uriImage}
              onError={({nativeEvent: {error}}) => console.log('error')}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={styles.category}>{media.section_name}</Text>
          <Ionicons
            name="bookmark-outline"
            color="lightgrey"
            size={24}
            onPress={() => this._toggleFavorite()}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
export default MediaItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  category: {
    color: 'lightgrey',
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  image: {
    opacity: opacity,
    width: 110,
    height: 69,
  },
});
/*
<Image
  style={styles.image}
  source={{
    uri: 'http://www.nytimes.com/' + media.multimedia[0].url,
  }}
  onError=({ nativeEvent: {error} }) => console.log(error)
/>
*/
