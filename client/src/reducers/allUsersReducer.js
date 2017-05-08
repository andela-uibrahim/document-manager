import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

/**
 * 
 * @export
 * @param {any} [state=initialState] 
 * @param {any} action 
 * @returns  {state}:
 */
export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {     
    case actionTypes.PAGINATED_USERS:
      return Object.assign({}, state,
       {  users: action.users, pageCount: action.pageCount });
    case actionTypes.USER_RETRIEVAL_FAILED:
      return Object.assign({},state,{ status: action.status});
    case actionTypes.VIEW_USER:
      return Object.assign({}, state, { user: action.user });
    case actionTypes.USER_UPDATED:
      return Object.assign({}, state, { user: action.user });
    case actionTypes.USER_DELETED:
      return  Object.assign({}, state, {  users: state.users.filter((user) => {
          return user.id !== action.userid;
        }) 
      });
     case actionTypes.USER_UPGRADED:
       return Object.assign({}, state, { users:
          state.users.map(user => {
            if(user.id === action.user.id) {
              user = action.user;
            }
          return user;
          })
        });
    case actionTypes.CLEAR_ALL:
      return Object.assign({}, state, { users: action.users });
    case actionTypes.FIND_USER:
      return Object.assign({}, state,
       { users: action.users, pageCount: action.pageCount });
    default:
      return state;
  }
}