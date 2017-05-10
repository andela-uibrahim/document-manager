/*eslint-disable no-undef*/
import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

/**
 * 
 * 
 * @export
 * @param {any} [state=initialState] 
 * @param {any} action 
 * @returns {state}:
 */
export default function loadingReducer(state = { isLoading: true }, action) {
  switch (action.type) {
    case actionTypes.LOADING:
      return Object.assign({}, state, {
         isLoading: action.isLoading
        });
    case actionTypes.NOT_LOADING:
    return Object.assign({}, state, {
         isLoading: action.isLoading
        });
    default:
      return state;
  }
}