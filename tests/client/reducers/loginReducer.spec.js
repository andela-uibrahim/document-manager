import expect from 'expect';
import types from '../../../client/src/actions/actionTypes';
import loginReducer from '../../../client/src/reducers/loginReducer';

describe('loginReducer', () => {
  it('should set user details when passed LOGIN_SUCCESSFUL', () => {
    const initialState = {};
    const loginDispatch = {
        type: types.LOGIN_SUCCESSFUL,  
        userId: '1',
        roleId: '1',
        username: 'freemile',
        token: 'loginreducertest1', 
        error: null,
        message: 'Login Successful',
    };

    const action = loginDispatch;
    const newState = loginReducer(initialState, action);

    expect(newState.userId).toEqual(loginDispatch.userId);
    expect(newState.roleId).toEqual(loginDispatch.roleId);
    expect(newState.token).toEqual(loginDispatch.token);
    expect(newState.success).toEqual(loginDispatch.message);
  });

  it('should return initial state if no action is passed', () => {
    const initialState = {};
    const action = {};
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

