import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';
/*eslint-disable no-undef*/

export default (documentid) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.delete(`/api/documents/${documentid}`, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      dispatch({
        type: actionTypes.DOCUMENT_DELETED,
        status: 'success'
      });
      browserHistory.push('/');
    }).catch((err) => {
      dispatch({
        type: actionTypes.DOCUMENT_DELETION_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};