import expect from 'expect';
import types from '../../../client/src/actions/actionTypes';
import allUsersReducer from '../../../client/src/reducers/allUsersReducer';

describe('allUsersReducer', () => {
  const users = [
    {id: '1', username: 'usman'},
    {id: '2', username: 'freemile'}, 
    {id: '3', username: 'ibrahim'}];

  const pageCount = '1';
  describe('PAGINATED_USERS', () => {
    it('should return a list of users and a pageCount detail', () => {
      const initialState = {};
      const paginateUsersDispatch = {
          type: types.PAGINATED_USERS,
          users,
          pageCount,
      };
      const action = paginateUsersDispatch;
      const newState = allUsersReducer(initialState, action);

      expect(newState.users).toEqual(paginateUsersDispatch.users);
      expect(newState.pageCount).toEqual(paginateUsersDispatch.pageCount);
    });
  });

  describe('VIEW_USER', () => {
    it('should return a user\'s detail', () => {
      const initialState = {};
      const viewUserDispatch = {
          type: types.VIEW_USER,
          user: users[1],
      };
      const action = viewUserDispatch;
      const newState = allUsersReducer(initialState, action);
      expect(newState.user).toEqual(viewUserDispatch.user);
    });

  });

  describe('USER_UPDATED', () => {
    it('should return a user\'s updated detail', () => {
      const initialState = {};
      const updateUserDispatch = {
          type: types.USER_UPDATED,
          user: users[1],
      };
      const action = updateUserDispatch;
      const newState = allUsersReducer(initialState, action);
      expect(newState.user).toEqual(updateUserDispatch.user);
    });

  });

  describe('USER_DELETED', () => {
    it('should return a user\'s updated detail', () => {
      const initialState = { users };
      const deleteUserDispatch = {
          type: types.USER_DELETED,
          userid: users[0].id,
          status: 'success',
      };
      const action = deleteUserDispatch;
      const newState = allUsersReducer(initialState, action);
      expect(newState.users).toEqual(users.slice(1));
    });

  });

  it('should return initial state if no action is passed', () => {
    const initialState = {};
    const action = {};
    const newState = allUsersReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

});

