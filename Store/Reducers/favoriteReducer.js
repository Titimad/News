//favoriteReducer.js
import database from '@react-native-firebase/database';

const initialState = {favoriteMedias: []};
console.log('initialState = ' + initialState);

function toggleFavorite(state = initialState, action) {
  console.log('favoriteReducer exécutée');
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      console.log('favoriteReducer exécutée case TOGGLE_FAVORITE');
      console.log('action.value = ' + action.value);

      const favoriteMediaIndex = state.favoriteMedias.findIndex(
        item => item._id === action.value._id,
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
      console.log('favoriteReducer, INIT');
      console.log(action.value);
      console.log('state = ' + state.favoriteMedias);
      nextState = {
        ...state,
        favoriteMedias: action.value,
      };
      console.log('nextState = ' + JSON.stringify(nextState));
      return nextState || state;
    default:
      return state;
  }
}

export default toggleFavorite;
