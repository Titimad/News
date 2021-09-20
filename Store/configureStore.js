//configureStore.js

import {createStore} from 'redux';
//import user from './Reducers/userReducer';
import toggleFavorite from './Reducers/favoriteReducer';

export default createStore(toggleFavorite);
