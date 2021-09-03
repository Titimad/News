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
  Alert,
} from 'react-native';

import Modal from 'react-native-modal';
import moment from 'moment';
import {WebView} from 'react-native-webview';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {getMediaFromApiWithSearchedText} from '../API/MediaStackApi';
import MediaItem from '../Components/MediaItem';
import FirstMediaItem from '../Components/FirstMediaItem';
import MediaDetail from '../Components/MediaDetail';

class TopTabAlaUne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medias: [],
      modalVisible: false,
      media: {
        web_url:
          'https://www.nytimes.com/2021/09/01/nyregion/r-kelly-trial.html',
      },
    };
    this._loadMedias();
    //console.log(this.state.media);
    //  console.log(this.state.medias);
  }
  _flatListItemSeparator() {
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
    const election = 'election';
    getMediaFromApiWithSearchedText(election).then(data => {
      this.setState({medias: data.response.docs});
    });
    //  console.log('state: ' + this.state.medias.response.docs[0].abstract);
    //    console.log('Fin de _loadMedias');
  }
  _displayMediaDetail = media => {
    console.log('Affichage du média: ' + media.title);
    this.setState({modalVisible: true, media: media});
  };
  _toggleFavorite() {
    //Action à faire si ajout à "Vos sélections"
    console.log('_toggleFavorite()');
  }
  render() {
    console.log('Props de TopTabAlaUne: ' + this.props);
    return (
      <SafeAreaView style={styles.container}>
        <GestureRecognizer
          style={{flex: 1}}
          onSwipeUp={() => this.setState({modalVisible: false})}
          onSwipeDown={() => this.setState({modalVisible: false})}>
          <Modal
            style={styles.modalView}
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setState({modalVisible: false});
            }}>
            <SafeAreaView style={{backgroundColor: 'white'}}>
              <WebView
                style={{marginTop: 0}}
                originWhitelist={['*']}
                source={{
                  uri: this.state.media.web_url,
                }}
              />
              <View style={styles.limitTabBarMenu} />
              <View style={styles.tabBarMenu}>
                <Text style={styles.crossTabBarMenu}>X</Text>
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
            </SafeAreaView>
          </Modal>
        </GestureRecognizer>
        <FlatList
          data={this.state.medias}
          renderItem={({item}) => (
            <MediaItem
              media={item}
              displayMediaDetail={this._displayMediaDetail}
            />
          )}
          keyExtractor={item => item._id}
          ListHeaderComponent={({item}) => <FirstMediaItem media={item} />}
          ItemSeparatorComponent={this._flatListItemSeparator}
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
    width: 110,
    height: 69,
  },
  imageMediaDetail: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width * 69) / 110,
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
  modalView: {
    margin: 0,
    backgroundColor: 'yellow',
    borderRadius: 20,
    padding: 0,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '100%',
    height: '100%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleMediaDetail: {
    margin: 15,
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'AmericanTypewriter-Bold',
  },
  categoryMediaDetail: {
    marginLeft: 15,
    marginRight: 15,
    color: 'grey',
    fontSize: 16,
    fontFamily: 'Futura-CondensedMedium',
  },
  descriptionMediaDetail: {
    marginLeft: 15,
    marginRight: 15,
    color: 'black',
    fontSize: 16,
    fontFamily: 'Arial',
  },
  infosMediaDetail: {
    marginLeft: 15,
    marginRight: 15,
    color: 'grey',
    fontSize: 13,
    fontFamily: 'Arial',
  },
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

  contenuMediaDetail: {
    marginLeft: 15,
    marginRight: 15,
    color: 'black',
    fontSize: 16,
    fontFamily: 'Arial',
  },
});
export default TopTabAlaUne;
/*
<Text style={styles.categoryMediaDetail}>
  {this.state.media.category.toUpperCase()}
</Text>
<Text style={styles.titleMediaDetail}>
  {this.state.media.title}
</Text>
<Text style={styles.descriptionMediaDetail}>
  {this.state.media.description}
</Text>
<Text style={styles.infosMediaDetail}>
  {'\n'}
  {this.state.media.source}
  {'\n\n'}
  Le{' '}
  {moment(new Date(this.state.media.published_at)).format(
    'DD/MM/YYYY',
  )}{' '}
  à{' '}
  {moment(new Date(this.state.media.published_at)).format(
    'HH:mm',
  )}
  {'.\n'}
</Text>
<Image
  style={styles.imageMediaDetail}
  source={{uri: this.state.media.image}}
/>
<Text style={styles.contenuMediaDetail}>
  {'\n'}A la veille de la rentrée scolaire, les débats
  s’intensifient autour de la vaccination des plus jeunes contre
  le Covid-19, notamment en raison de la propagation du variant
  Delta, qui affecte davantage les enfants. C’est l’un des
  thèmes les plus abordés dans les cortèges des manifestations
  contre le passe sanitaire au mois d’août, avec un slogan, «
  Touche pas à mes enfants », visible sur de nombreuses
  pancartes. En France, les jeunes de 12 à 17 ans seulement
  peuvent se faire vacciner contre le Covid-19, hormis des cas
  très particuliers. Mais l’extension à venir du passe sanitaire
  – le 30 septembre – pour cette tranche d’âge est perçue par
  les personnes hostiles aux vaccins comme un glissement
  progressif vers l’obligation vaccinale pour les enfants.
  Certains redoutent aussi l’extension de la campagne vaccinale
  aux plus jeunes, même si le ministre de l’éducation nationale,
  Jean-Michel Blanquer, a déclaré le 19 août que la vaccination
  des moins de 12 ans n’était « pas d’actualité ». Si des
  craintes peuvent s’avérer légitimes, certaines s’expriment
  bien souvent au travers de rumeurs infondées, d’informations
  manipulées, voire mensongères.
</Text>
<Text>Dans la même rubrique</Text>
<Text>Réactions</Text>
<WebView source={{uri: 'https://reactnative.dev/'}} />;
*/
//this._flatListFirstItem
