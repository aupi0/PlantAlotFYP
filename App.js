import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import plantIDReducer from './store/reducers/plantID';
import authReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
  plantID: plantIDReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

//TODO: STORE PLANT RESULTS
//TODO: RETIREVE PLAYER SCORES
//TODO: ADD LOCATION TO PLANT IDENTIFICATIONS

//Potential extensions
//Friend list, score amonst friends
//was this your plant? y n
//If not this plant was it this one?
//other peoples profiles, their score and plants they have found