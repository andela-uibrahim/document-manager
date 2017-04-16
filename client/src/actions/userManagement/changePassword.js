import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, passwordData, userid) => {
  return (dispatch) => {
    return axios.put(`/api/users/${userid}`, passwordData, {
      headers: {
        Authorization: token
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.PASSWORD_UPDATED,
          status: 'updated'
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.PASSWORD_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};