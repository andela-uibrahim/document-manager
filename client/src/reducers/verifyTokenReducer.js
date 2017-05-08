import { browserHistory } from 'react-router';
import actionTypes from '../actions/actionTypes';

/**
 * 
 * 
 * @export
 * @param {any} [state={}] 
 * @param {any} action 
 * @returns {state}: 
 */
export default function verifyTokenReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.IS_ACTIVE_USER:
      return Object.assign({}, state, { isLoggedIn: action.isLoggedIn });
    case actionTypes.IS_NOT_ACTIVE_USER:
      window.localStorage.clear();
      browserHistory.push('/');
      return Object.assign({}, state, { isLoggedIn: action.isLoggedIn });
    default:
      return state;
  }
}