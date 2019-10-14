import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './src/reducers';
import AppContainer from './src/navigation/AppNavigation';

import createSagaMiddeware from 'redux-saga';
import rootSaga from './src/sagas/rootSaga';

const sagaMiddware = createSagaMiddeware();
let store = createStore(allReducers, applyMiddleware(sagaMiddware));

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <AppContainer /> 
        </Provider>
    );
  }
};
sagaMiddware.run(rootSaga); 
