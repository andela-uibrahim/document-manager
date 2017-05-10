/* eslint-disable no-undef */
import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';
import setLoading from '../helper/setLoading';

export default (userid) => {
  const token = window.localStorage.getItem('token');
  return function (dispatch) {
    setLoading.isLoading(dispatch,actionTypes);
    return axios.delete(`/api/users/${userid}`, {
      headers: {
        Authorization: token
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.USER_DELETED,
          userid,
          status: 'success'
        });
        setLoading.isNotLoading(dispatch,actionTypes);
        browserHistory.push('/users');
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_DELETION_FAILED,
          status: 'failed',
          error: err.message
        });
        setLoading.isNotLoading(dispatch,actionTypes);
      });
  };
};

