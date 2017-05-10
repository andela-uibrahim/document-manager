
import axios from 'axios';
import browserHistory from 'react-router';
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
          type: actionTypes.USER_UPGRADED,
          user: user.data,
        });
        setLoading.isNotLoading(dispatch,actionTypes);
        if (userData.RoleId){
          browserHistory.push('/users');
        }
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_UPGRADE_FAILED,
          status: 'failed',
          error: err.message
        });
        setLoading.isNotLoading(dispatch,actionTypes);
      });
  };
};


