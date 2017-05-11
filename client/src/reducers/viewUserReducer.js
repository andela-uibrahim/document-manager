import actionTypes from '../actions/actionTypes';

/**
 * 
 * 
 * @export
 * @param {any} [state={}] 
 * @param {any} action 
 * @returns {state}: 
 */
export default function viewUserReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.VIEW_USER:
      return Object.assign({}, state, { user: action.user });
    default:
      return state;
  }
}