//mainReducer.js
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
console.log('Lecture de mainReducer');
var user;
if (auth().currentUser != null) {
  user = auth().currentUser.uid;
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
      console.log('mainReducer, TOGGLE_FAVORITE');
      //  console.log('favoriteReducer exécutée case TOGGLE_FAVORITE');
      //console.log('action.value = ' + action.value);
      if (action.value.numberOfFavorites != 0) {
        console.log('Test si présent dans les favoris');
        const favoriteMediaIndex = state.favoriteMedias.findIndex(
          item => item._id === action.value.media._id,
        );
        if (favoriteMediaIndex !== -1) {
          console.log(
            'Le média est déjà dans les favoris, on le supprime de la liste',
          );
          nextState = {
            ...state,
            favoriteMedias: state.favoriteMedias.filter(
              (item, index) => index !== favoriteMediaIndex,
            ),
          };
          //Mise à jour de la dataBase
          database()
            .ref(action.value.ref)
            .set({
              favoriteMedias: nextState.favoriteMedias,
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
            favoriteMedias: [...state.favoriteMedias, action.value.media],
          };
          console.log(
            'Dans mainReducer, TOGGLE_FAVORITE, nextState = ' +
              JSON.stringify(nextState),
          );
          database()
            .ref(action.value.ref)
            .set({
              favoriteMedias: nextState.favoriteMedias,
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
      } else {
        console.log(
          "Le média n'est pas dans les médias favoris, on l'ajoute à la liste",
        );
        nextState = {
          ...state,
          favoriteMedias: [...state.favoriteMedias, action.value.media],
        };
        console.log(
          'Dans mainReducer, TOGGLE_FAVORITE, nextState = ' +
            JSON.stringify(nextState),
        );
        database()
          .ref(action.value.ref)
          .set({
            favoriteMedias: nextState.favoriteMedias,
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
      nextState = action.value;
      console.log('nextState = ' + JSON.stringify(nextState));
      return nextState || state;
    case 'CREATE_ACCOUNT':
      console.log('mainReducer, CREATE_ACCOUNT');
      console.log(action.value);
      console.log('state = ' + state.favoriteMedias);
      nextState = action.value;
      console.log('nextState = ' + JSON.stringify(nextState));
      return nextState || state;

    case 'DISCONNECT':
      console.log('mainReducer: DISCONNECT');
      nextState = {
        user: null,
        favoriteMedias: [],
      };
      return nextState || state;
    case 'CONNECT':
      console.log('mainReducer: CONNECT');
      nextState = action.value;
      console.log('nextState = ' + JSON.stringify(nextState));
      return nextState || state;
    default:
      console.log('mainReducer: default');
      return state;
  }
}

export default mainReducer;
