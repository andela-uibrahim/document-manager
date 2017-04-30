/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import initialState from './store/initialState';
import routes from './routes.jsx';
import './styles/styles.scss';


const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
 , document.getElementById('app'));
