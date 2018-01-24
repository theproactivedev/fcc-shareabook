import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage.js';

export default function configureStore() {
  const loggerMiddleware = createLogger();
  const persistedState = loadState();

  let store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );

  store.subscribe(throttle(() => {
    saveState({
      isUserAuthenticated: true,
      user: store.getState().user
    }, 1000);
  }));

  return store;
};
