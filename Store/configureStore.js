//configureStore.js

import {createStore} from 'redux';
import mainReducer from './Reducers/mainReducer';
/*
const rootReducer = combineReducers({
  user: user,
  toggleFavorite: toggleFavorite,
});*/

export default createStore(mainReducer);
