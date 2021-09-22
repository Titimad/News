//mainReducer.js
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
var user;
if (auth().currentUser != null) {
  user = auth().currentUser.email;
} else {
  user = null;
}
const initialState = {user: user, favoriteMedias: []};
//console.log('initialState = ' + JSON.stringify(initialState));

function mainReducer(state = initialState, action) {
  //  console.log('favoriteReducer exécutée. action =' + JSON.stringify(action));
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      //  console.log('favoriteReducer exécutée case TOGGLE_FAVORITE');
      //console.log('action.value = ' + action.value);

      const favoriteMediaIndex = state.favoriteMedias.findIndex(
        item => item._id === action.value._id,
      );
      if (favoriteMediaIndex !== -1) {
        //      console.log('Le média est déjà dans les favoris, on le supprime de la liste',);
        nextState = {
          ...state,
          favoriteMedias: state.favoriteMedias.filter(
            (item, index) => index !== favoriteMediaIndex,
          ),
        };
        //Mise à jour de la dataBase
        database()
          .ref('/user')
          .set({
            favorites: nextState,
          })
          .then(data => {
            //success callback
            console.log('data ', data);
          })
          .catch(error => {
            //error callback
            console.log('error ', error);
          });
      } else {
        console.log(
          "Le média n'est pas dans les médias favoris, on l'ajoute à la liste",
        );
        nextState = {
          ...state,
          favoriteMedias: [...state.favoriteMedias, action.value],
        };
        database()
          .ref('/user')
          .set({
            favorites: nextState,
          })
          .then(data => {
            //success callback
            console.log('data ', data);
          })
          .catch(error => {
            //error callback
            console.log('error ', error);
          });
      }
      return nextState || state;
    case 'INIT':
      console.log('mainReducer, INIT');
      console.log(action.value);
      console.log('state = ' + state.favoriteMedias);
      nextState = {
        ...state,
        favoriteMedias: action.value,
      };
      console.log('nextState = ' + JSON.stringify(nextState));
      return nextState || state;
    case 'DISCONNECT':
      console.log('mainReducer: DISCONNECT' + action.type);
      nextState = {
        user: null,
        favoriteMedias: [],
      };
      return nextState || state;
    case 'CONNECT':
      console.log('mainReducer: CONNECT' + action.type);
      nextState = {
        user: action.value.user,
        favoriteMedias: action.value.favoriteMedias,
      };
      return nextState || state;
    default:
      console.log('mainReducer: default');
      return state;
  }
}

export default mainReducer;
