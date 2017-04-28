import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../actionTypes';

export const loginSuccessful = user => ({ 
  type: actionTypes.SIGN_UP_SUCCESSFUL,
  user,
  message: 'SignUp Successful',
});

export default (userData) => {
  return (dispatch) => {
    return axios.post('/api/users', userData)
      .then((response) => {
        
        window.localStorage.setItem('token', response.data.token);
        const user = jwtDecode(response.data.token);
        dispatch(loginSuccessful(user));
      }).catch((error) => {
        dispatch({
          type: actionTypes.SIGN_UP_ERROR,
          message: 'Invalid credentials'
        });
      });
  };
};