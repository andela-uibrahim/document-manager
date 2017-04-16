
import axios from 'axios';
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
          type: actionTypes.USER_UPDATED,
          user: user.data,
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};


