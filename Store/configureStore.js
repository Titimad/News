//configureStore.js

import {createStore, combineReducers} from 'redux';
import user from './Reducers/userReducer';
import mainReducer from './Reducers/mainReducer';
/*
const rootReducer = combineReducers({
  user: user,
  toggleFavorite: toggleFavorite,
});*/

export default createStore(mainReducer);
