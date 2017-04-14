import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function allRolesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ALL_ROLES:
      return Object.assign({}, state, { roles: action.roles });
    case actionTypes.ROLE_RETRIEVAL_FAILED:
      return [...state, Object.assign({}, action.status)];
    case actionTypes.ROLE_DELETED:
      return Object.assign({}, state, { roles: state.roles.filter((role) => {
          return role.id !== action.roleId;
        }) });
    case actionTypes.CLEAR_ALL:
      return  Object.assign({}, state, { roles: action.roles });
    case actionTypes.FIND_ROLE:
      return  Object.assign({}, state, { roles: action.roles, pageCount: action.pageCount });
    default:
      return state;
  }
}