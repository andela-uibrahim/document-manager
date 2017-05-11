import axios from 'axios';
import actionTypes from '../actionTypes';
import setLoading from '../helper/setLoading';

export default (token, userid) => {
  return (dispatch) => {
    setLoading.isLoading(dispatch,actionTypes);
    return axios.get(`/api/users/${userid}`, {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.VIEW_USER,
          user: response.data.user
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
