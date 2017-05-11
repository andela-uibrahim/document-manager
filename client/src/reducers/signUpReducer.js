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
export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGN_UP_SUCCESSFUL:
      return Object.assign({}, state, { 
        user: action.user,
        error: null,
        success: action.message
      });
    case actionTypes.SIGN_UP_ERROR:
      toastr.error('Invalid Credentials');
      return Object.assign({}, state, {
         error: action.message, success: null
      });
    default:
      return state;
  }
}