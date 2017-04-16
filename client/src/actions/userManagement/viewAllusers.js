import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token) => {
  return (dispatch) => {
    return axios.get('/api/users', {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.PAGINATED_USERS,
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
