import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import plantIDReducer from './store/reducers/plantID';
import authReducer from './store/reducers/auth';
import scoreBoardReducer from './store/reducers/scoreBoard';
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
  plantID: plantIDReducer,
  auth: authReducer,
  scoreBoard: scoreBoardReducer
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
//TODO: ADD CLEARING OF AUTH FORM WHEN ISREIGSTER CHANGES
//TODO: ADD POWERED BY PLANTID AT PLANT INFORMATION SCREEN
//TODO: CHANGE HOW PLANTS ARE ASSOCIATED WITH USERS
//TODO: MERGE IDENTIFY PLANT AND GET PLANT IDENTIFICATION INTO ONE API CALL HANDLED BY SERVER INSTEAD
//TODO: FIX STRANGE BUG WHERE IF YOU GO OFF CAMERA IT GOES BLACK SCREEN WHEN U GO BACK ON

//add flash to the camera
//Potential extensions
//Friend list, score amonst friends
//was this your plant? y n
//If not this plant was it this one?
//other peoples profiles, their score and plants they have found
//Add redux persist to login
//Add flash to camera