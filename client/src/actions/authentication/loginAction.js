/* eslint-disable no-undef */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../actionTypes';

export default (credentials) => {
  return (dispatch) => {
    return axios.post('/api/users/login', credentials)
      .then((response) => {
        let userId;
        let roleId;
        let username;
        let token;
        if(window.localStorage){
          token = response.data.token;
          userId = jwtDecode(token).UserId;
          roleId = jwtDecode(token).RoleId;
          username =  jwtDecode(token).username;
          window.localStorage.setItem('token', token);
        } else {
          userId = credentials.userId;
          roleId = credentials.roleId;
          username = credentials.username;
          token = credentials.token;
        }
        dispatch({
          type: actionTypes.LOGIN_SUCCESSFUL,
          userId,
          roleId,
          username,
          token,
          message: 'Login Successful'
        });
      }).catch(() => {
        dispatch({
          type: actionTypes.LOGIN_ERROR,
          message: 'Invalid credentials'
        });
      });
  };
};