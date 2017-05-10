import expect from 'expect';
import types from '../../../client/src/actions/actionTypes';
import signUpReducer from '../../../client/src/reducers/signUpReducer';

describe('signUpReducer', () => {
  it('should set user details when Type is SIGN_UP_SUCCESSFUL', () => {
    const initialState = {};
    const signUpDispatch = {
        type: types.SIGN_UP_SUCCESSFUL,
        user: 'new user',
        message: 'SignUp Successful',
    };

    const action = signUpDispatch;
    const newState = signUpReducer(initialState, action);

    expect(newState.error).toEqual(null);
    expect(newState.success).toEqual(signUpDispatch.message);
    expect(newState.user).toEqual(signUpDispatch.user);
  });

   it('should return initial state if no action is passed', () => {
    const initialState = {};
    const action = {};
    const newState = signUpReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

