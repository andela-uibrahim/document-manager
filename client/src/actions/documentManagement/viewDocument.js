import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, documentid) =>  {
  return function (dispatch) {
    return axios.get(`/api/documents/${documentid}`, {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.VIEW_DOCUMENT,
          document: response.data.document
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.DOCUMENT_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};