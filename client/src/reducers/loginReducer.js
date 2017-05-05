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
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFUL:
      return Object.assign({}, state, {
         userId: action.userId,
         roleId: action.roleId,
         token: action.token, 
         error: null,
         success: action.message
        });
    case actionTypes.LOGIN_ERROR:
      return Object.assign({}, state, {
         error: action.message, success: null
        });
    default:
      return state;
  }
}