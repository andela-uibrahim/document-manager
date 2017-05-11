import axios from 'axios';
import actionTypes from '../actionTypes';
import setLoading from '../helper/setLoading';

export default (token) => {
  return (dispatch) => {
    setLoading.isLoading(dispatch,actionTypes);
    return axios.get('/api/roles', {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.ALL_ROLES,
          roles: response.data,
          pageCount: response.data.pageCount,
          currentPage: response.data.currentPage,
        });
        setLoading.isNotLoading(dispatch,actionTypes);
      }).catch((err) => {
        dispatch({
          type: actionTypes.ROLE_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
        setLoading.isNotLoading(dispatch,actionTypes);
      });
  };
};