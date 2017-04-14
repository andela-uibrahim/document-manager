import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token) => {
  return (dispatch) => {
    return axios.get('/api/roles', {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.ALL_ROLES,
          roles: response.data,
          pageCount: response.data.pageCount
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.ROLE_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};