//MediaDetail.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';

import {WebView} from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

const mapStateToProps = state => {
  return {user: state.user, favoritesArticle: state.favoritesArticle};
};

class MediaDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
  render() {
    const web_url = this.props.web_url;
    const closeModal = this.props.closeModal;
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <WebView
          style={{marginTop: 0}}
          onLoad={() => this.setState({isLoading: false})}
          originWhitelist={['*']}
          source={{
            uri: web_url,
          }}
        />
        <View style={styles.limitTabBarMenu} />
        <View style={styles.tabBarMenu}>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.crossTabBarMenu}>X</Text>
          </TouchableOpacity>
          <Octicons
            name="settings"
            color="black"
            size={24}
            onPress={() => this._toggleFavorite()}
          />
          <Ionicons
            name="bookmark-outline"
            color="black"
            size={24}
            onPress={() => this._toggleFavorite()}
          />
          <Ionicons
            name="share-outline"
            color="black"
            size={24}
            onPress={() => this._toggleFavorite()}
          />
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
        {this._displayLoading()}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  limitTabBarMenu: {
    height: 1,
    width: Dimensions.get('window').width,
    backgroundColor: 'lightgrey',
  },
  tabBarMenu: {
    width: Dimensions.get('window').width,
    padding: 10,

    justifyContent: 'space-around',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  crossTabBarMenu: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Arial',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default connect(mapStateToProps)(MediaDetail);
