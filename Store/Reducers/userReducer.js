//userReducer.js
import auth from '@react-native-firebase/auth';

const initialState = {};
console.log('initialState = ' + JSON.stringify(initialState));

function user(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'DISCONNECT':
      console.log('userReducer: ' + action.type);
      nextState = {
        user: null,
        favoriteMedias: [],
      };
      return nextState || state;
    case 'CONNECT':
      console.log('userReducer: ' + action.type);
      /*nextState = {
        user: null,
        favoriteMedias: [],
      };*/
      return nextState || state;
    default:
      console.log('userReducer: default');
      return state;
  }
}
export default user;
