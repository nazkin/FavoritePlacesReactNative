import React from 'react';
import {} from 'react-native';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppNavigation from './navigation/PlacesNavigationCenter';

import placesReducer from './screens/redux/reducers/placeReducers';
import {init} from './storageHelpers/db';
//REDUX*******************************
init()
  .then(()=> console.log('Init DB success'))
  .catch(err=> console.log('Init DB fail', err));

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

