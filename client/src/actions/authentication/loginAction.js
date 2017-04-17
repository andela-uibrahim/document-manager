import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../actionTypes';

export default (credentials) => {
  return (dispatch) => {
    return axios.post('/api/users/login', credentials)
      .then((response) => {
        const token = response.data.token;
        const userId = jwtDecode(token).UserId;
        const roleId = jwtDecode(token).RoleId;
        const username =  jwtDecode(token).username;
        window.localStorage.setItem('token', token);
        dispatch({
          type: actionTypes.LOGIN_SUCCESSFUL,
          userId,
          roleId,
          username,
          token,
          message: 'Login Successful'
        });
      }).catch((error) => {
        dispatch({
          type: actionTypes.LOGIN_ERROR,
          message: 'Invalid credentials'
        });
      });
  };
};