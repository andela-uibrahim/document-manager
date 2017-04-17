import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = [thunk];

/**
 * @return null
 */
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}