/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import authReducer from './src/reducers/authReducer';
import choresReducer from './src/reducers/choresReducer';
import roomiesReducer from './src/reducers/roomiesReducer';
import sprintReducer from './src/reducers/sprintReducer';
import houseReducer from './src/reducers/houseReducer';
import sprintChoresReducer from './src/reducers/sprintChoresReducer';
import signUpReducer from './src/reducers/signUpReducer';



const rootReducer = combineReducers({
  auth: authReducer,
  chores: choresReducer,
  sprint: sprintReducer,
  roomies: roomiesReducer,
  house: houseReducer,
  sprintChores: sprintChoresReducer,
  signUp: signUpReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const configureStore = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

export default configureStore;
