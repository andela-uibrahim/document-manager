
import axios from 'axios';
import actionTypes from '../actionTypes';
import setLoading from '../helper/setLoading';

export default (token, userNames) => {
  return function (dispatch) {
    setLoading.isLoading(dispatch,actionTypes);
    return axios.get(`/api/search/users/?search=${userNames}`, {
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
        setLoading.isNotLoading(dispatch,actionTypes);
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
        setLoading.isNotLoading(dispatch,actionTypes);
      });
  };
};
