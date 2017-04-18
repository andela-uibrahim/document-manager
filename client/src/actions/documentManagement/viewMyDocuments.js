import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export default (userid) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.get(`/api/users/${userid}/documents/`, {
      headers: {
        Authorization: token
      }
    })
    .then((response) => {
      dispatch({
        type: actionTypes.USER_DOCUMENTS_FOUND,
        status: 'success',
        documents: response.data
      });
    }).catch((err) => {
      dispatch({
        type: actionTypes.USER_DOCUMENTS_NOT_FOUND,
        status: 'failed',
        error: err.message,
        documents: []
      });
    });
  };
};