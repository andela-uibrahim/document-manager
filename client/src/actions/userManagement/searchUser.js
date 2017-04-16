
import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, userNames) => {
  return function (dispatch) {
    return axios.get(`/api/users?query=${userNames}`, {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.FIND_USER,
          users: response.data.users,
          pageCount: response.data.pageCount
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};
