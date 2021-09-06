//FirstMediaItem.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

class FirstMediaItem extends React.Component {
  render() {
    const {media, displayMediaDetail, category} = this.props;
    console.log('Category dans FirstMediaItem: ' + category);
    if ((media != undefined) & (category == 'Front Page')) {
      return (
        <TouchableOpacity onPress={() => displayMediaDetail(media)}>
          <View>
            <ImageBackground
              style={styles.imageAlaUne}
              source={{
                uri: 'http://www.nytimes.com/' + media.multimedia[0].url,
              }}>
              <LinearGradient
                colors={['transparent', 'black']}
                start={{x: 0.0, y: 0.52}}
                end={{x: 0.0, y: 1.0}}
                locations={[0, 0.5]}
                style={styles.box}>
                <Text style={styles.titleAlaUne}>{media.headline.main}</Text>
                <View style={{alignItems: 'flex-end'}}>
                  <Ionicons
                    name="bookmark-outline"
                    color="lightgrey"
                    size={24}
                  />
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  }
}
export default FirstMediaItem;

const styles = StyleSheet.create({
  titleAlaUne: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'AmericanTypewriter-Bold',
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
