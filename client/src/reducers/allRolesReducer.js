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
export default function allRolesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ALL_ROLES:
      return Object.assign({}, state, { roles: action.roles });
    case actionTypes.ROLE_DELETED:
      return Object.assign({}, state, { roles: state.roles.filter((role) => {
          return role.id !== action.roleId;
        }) 
      });
    default:
      return state;
  }
}