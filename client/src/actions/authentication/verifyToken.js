/* eslint-disable no-undef */
import axios from 'axios';
import actionTypes from '../actionTypes';

/**
 * getActiveUser - makes a get request to the server to get the
 * information of the user who is currently active. On success, It then
 * dispatches an action containing the user's information
 * @return {object} object to be sent to all reducers
 */
export default function verifyToken() {
  return (dispatch) => {
   let credential ={};
   let token = (window.localStorage.getItem('token'));
   credential.token = token;
    axios.post('/api/users/verify', credential)
      .then((res) => {
          dispatch({
            type: actionTypes.IS_ACTIVE_USER,
            message: res.message,
            isLoggedIn: true
          });
      })
      .catch(() => {
         dispatch({
            type: actionTypes.IS_NOT_ACTIVE_USER,
            message: 'expired token',
            isLoggedIn: false
          });
      })
    };
  }