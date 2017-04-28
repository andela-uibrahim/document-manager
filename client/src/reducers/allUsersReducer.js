import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ALL_USERS:
      return Object.assign({}, state, { users: action.users });
    case actionTypes.USER_CREATED:
      return Object.assign({}, state, { users: action.users });      
    case actionTypes.PAGINATED_USERS:
      return Object.assign({}, state, {  users: action.users, pageCount: action.pageCount });
    case actionTypes.USER_RETRIEVAL_FAILED:
      return [...state, Object.assign({}, action.status)];
    case actionTypes.VIEW_USER:
      return Object.assign({}, state, { user: action.user });
    case actionTypes.USER_UPDATED:
      return Object.assign({}, state, { user: action.user });
    case actionTypes.USER_DELETED:
      return  Object.assign({}, state, {  users: state.users.filter((user) => {
          return user.id !== action.userid;
        }) 
      });
    case actionTypes.CLEAR_ALL:
      return Object.assign({}, state, { users: action.users });
    case actionTypes.FIND_USER:
      return Object.assign({}, state, { users: action.users, pageCount: action.pageCount });
    default:
      return state;
  }
}