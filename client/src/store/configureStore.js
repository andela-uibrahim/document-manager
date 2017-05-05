import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';

const middlewares = [thunk, reduxImmutableStateInvariant()];

/**
 * 
 * 
 * @export
 * @param {any} initialState 
 * @returns {void}
 */
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}