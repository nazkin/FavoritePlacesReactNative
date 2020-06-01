import React from 'react';
import {} from 'react-native';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppNavigation from './navigation/PlacesNavigationCenter';

import placesReducer from './screens/redux/reducers/placeReducers';

//REDUX*******************************

const rootReducer = combineReducers({
  places: placesReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//REDUX*******************************

export default function App() {

  return (

    <Provider store={store}>
      <AppNavigation />
    </Provider>
    
  )

}

