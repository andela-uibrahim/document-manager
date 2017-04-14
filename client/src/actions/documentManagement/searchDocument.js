import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, documentName) => {
  return (dispatch) => {
    return axios.get(`/api/documents/?search=${documentName}`, {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.FIND_DOCUMENT,
          documents: response.data.results.rows,
          pageCount: response.data.pagination.pageCount
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
