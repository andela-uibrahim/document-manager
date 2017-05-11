import expect from 'expect';
import types from '../../../client/src/actions/actionTypes';
import allRolesReducer from '../../../client/src/reducers/allRolesReducer';

describe('allRolesReducer', () => {
  const roles = [
    {id: '1', role: 'admin'},
    {id: '2', role: 'regular'}, 
    {id: '3', role: 'newRole'}];

  const pageCount = '1';
  
  describe('allRoles', () => {
    it('should present all roles when passed ALL_ROLES action', () => {
      const initialState = {};
      const allRolesDispatch = {
          type: types.ALL_ROLES,  
          roles,
          pageCount,
      };

      const action = allRolesDispatch;
      const newState = allRolesReducer(initialState, action);
      expect(newState.roles).toEqual(allRolesDispatch.roles);
    });


    it('should return initial state if no action is passed', () => {
      const initialState = {};
      const action = {};
      const newState = allRolesReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('ROLE_DELETED action', () => {
    it('should return the old array of roles without the deleted role',
     () => {
      const initialState = {
        roles,
      };
      const roleDeletedDispatch = {
          type: types.ROLE_DELETED,
          roleId: '3',
          status: 'success'
      };

      const action = roleDeletedDispatch;
      const newState = allRolesReducer(initialState, action);
      expect(newState.roles).toEqual(roles.splice(0, 2));
    });
  });
});

