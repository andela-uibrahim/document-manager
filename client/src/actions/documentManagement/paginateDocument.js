import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, offset, limit) => {
  return (dispatch) => {
    return axios.get(`/api/documents/?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.PAGINATED_DOCUMENTS,
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