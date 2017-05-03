/*eslint-disable no-undef*/
import axios from 'axios';
import actionTypes from '../actionTypes';

export default (userid, offset) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.get(`/api/users/${userid}/documents/?offset=${offset}`, {
      headers: {
        Authorization: token
      }
    })
    .then((response) => {
      dispatch({
        type: actionTypes.USER_DOCUMENTS_FOUND,
        status: 'success',
        documents: response.data.results.rows,
        pageCount: response.data.pagination.pageCount
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