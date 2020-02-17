import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import ReduxPromise from 'redux-promise';

import App from './App';

import reducers  from './Reducers/index';

// make a store 
const createstoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createstoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.getElementById('root'));
