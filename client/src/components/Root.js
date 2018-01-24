import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter><App /></BrowserRouter>
      </Provider>
    )
  }
};
