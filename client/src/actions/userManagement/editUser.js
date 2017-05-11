
import axios from 'axios';
import actionTypes from '../actionTypes';
import setLoading from '../helper/setLoading';

export default (token, userData, userid) => {
  return (dispatch) => {
    setLoading.isLoading(dispatch,actionTypes);
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
        setLoading.isNotLoading(dispatch,actionTypes);
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
        setLoading.isNotLoading(dispatch,actionTypes);
      });
  };
};


