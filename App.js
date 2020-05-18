import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import plantIDReducer from "./store/reducers/plantID";
import authReducer from "./store/reducers/auth";
import scoreBoardReducer from "./store/reducers/scoreBoard";
import NavigationContainer from "./navigation/NavigationContainer";

const rootReducer = combineReducers({
  plantID: plantIDReducer,
  auth: authReducer,
  scoreBoard: scoreBoardReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
