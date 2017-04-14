import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export default (details, token, documentid) => {
  return (dispatch) => {
    return axios.put(`/api/documents/${documentid}`, details, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      browserHistory.push('/');
    }).catch((err) => {
      dispatch({
        type: actionTypes.DOCUMENT_UPDATE_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};