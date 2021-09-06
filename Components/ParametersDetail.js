//ParametersDetail.js
import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class ParametersDetail extends React.Component {
  constructor(props) {
    super(props);
    const {createUser, logInUser, logOff, closeModal} = this.props;
    this.state = {modalVisible: true};
  }

  render() {
    <Modal
      style={styles.modalView}
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        this.setState({modalVisible: false});
      }}>
      <Button title="Create account" onPress={this.createUser} />
      <Button title="Log in" onPress={this.logInUser} />
    </Modal>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'space-between',
    //    marginTop: 32,
  },
});
export default ParametersDetail;
