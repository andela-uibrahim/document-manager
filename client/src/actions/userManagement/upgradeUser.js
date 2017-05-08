
import axios from 'axios';
import browserHistory from 'react-router';
import actionTypes from '../actionTypes';

export default (token, userData, userid) => {
  return (dispatch) => {
    return axios.put(`/api/users/${userid}`, userData, {
      headers: {
        Authorization: token
      }
    })
      .then((user) => {
        dispatch({
          type: actionTypes.USER_UPGRADED,
          user: user.data,
        });
        if (userData.RoleId){
          browserHistory.push('/users');
        }
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_UPGRADE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};


