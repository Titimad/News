//ParametersDetail.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SectionList,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import {connect} from 'react-redux';

import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import LogIn from './LogIn';

const mapStateToProps = state => {
  return {state};
};

const DATA = [
  {
    title: '\nACCOUNT',
    data: ['User', 'Password'],
  },
  {
    title: '\nSUBSCRIBERS EDITION',
    data: ['Subscribe', 'Restore your subscription'],
  },
  {
    title: '\nAPPLICATION SETTINGS',
    data: ['Notifications', 'Font size', 'Appearance'],
  },
  {title: '\nHELP & SUPPORT', data: ['New Application', 'FAQ', 'Contact us']},
  {
    title: '\nABOUT',
    data: ['The News Team', 'Conditions and confidentiality', 'Version'],
  },
];
const DisconnectionButton = ({user, logOff}) => {
  if (user != null) {
    return (
      <View>
        <View style={{backgroundColor: 'gainsboro', padding: 10}}>
          <Text> </Text>
        </View>
        <View
          style={{alignItems: 'center', backgroundColor: 'white', padding: 20}}>
          <TouchableOpacity onPress={() => logOff()}>
            <Text style={{color: 'red', fontSize: 16}}>Disconnection</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};
const Item = ({title, openModalParam, user}) => (
  <TouchableOpacity onPress={() => openModalParam()}>
    <View style={styles.item}>
      <Text style={styles.titleList}>{SousTitre(title, user)}</Text>
      <Text style={{color: 'grey', fontSize: 20, fontWeight: 'bold'}}>
        {'>'}
      </Text>
    </View>
  </TouchableOpacity>
);

function SousTitre(title, user) {
  if (title == 'User') {
    if (user != null) {
      return 'My account';
    } else {
      return 'Sign in';
    }
  } else {
    if (title == 'Password') {
      if (user != null) {
        return 'Change password';
      } else {
        return 'Create account';
      }
    }
    return title;
  }
}
class ParametersDetail extends React.Component {
  constructor(props) {
    super(props);
    this._closeModalParam = this._closeModalParam.bind(this);
    this.state = {modalVisible: false, user: auth().currentUser};
    //const {createUser, logInUser, logOff, closeModalParam} = this.props;
  }
  _sectionListItemSeparator() {
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
  _openModalParam() {
    this.setState({modalVisible: true});
  }
  _closeModalParam() {
    console.log('_closeModalParam de ParametersDetail');
    this.setState({modalVisible: false});
  }
  _logOff() {
    console.log('Dans _logOff, user = ' + this.props.state.user);
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        const action = {type: 'DISCONNECT', value: null};
        this.props.dispatch(action);
        console.log('Dans _logOff, user = ' + this.props.state.user);
        this.setState({user: null});
      });
  }
  render() {
    const closeModalParam = this.props.closeModalParam;
    const user = this.props.state.user;
    console.log('User dans ParametersDetail: ' + user);
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          style={styles.modalView}
          animationType="slide"
          animationIn={'slideInLeft'}
          animationOut="slideOutRight"
          swipeDirection={['right']}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setState({modalVisible: false});
          }}>
          <LogIn closeModalParam={this._closeModalParam} />
        </Modal>
        <TouchableOpacity title="Close" onPress={closeModalParam}>
          <Text style={{color: '#007AFF', fontSize: 20, padding: 20}}>
            Close
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Parameters</Text>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Item
              title={item}
              openModalParam={() => this._openModalParam()}
              user={user}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.headerList}>{title}</Text>
          )}
          ItemSeparatorComponent={this._sectionListItemSeparator}
        />
        <DisconnectionButton
          user={this.state.user}
          logOff={() => this._logOff()}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'gainsboro',
    width: '100%',
    //justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 20,
    paddingTop: 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerList: {
    fontSize: 16,
    color: 'dimgrey',
    backgroundColor: 'gainsboro',
    paddingLeft: 20,
  },
  titleList: {
    fontSize: 16,
    marginLeft: 10,
  },
});
export default connect(mapStateToProps)(ParametersDetail);
