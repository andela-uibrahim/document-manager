/*eslint-disable no-undef*/
import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';
import setLoading from '../helper/setLoading';

export default (details, token, documentid) => {
  return (dispatch) => {
    setLoading.isLoading(dispatch,actionTypes);
    return axios.put(`/api/documents/${documentid}`, details, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      toastr.info('Document successfully updated');
      setLoading.isNotLoading(dispatch,actionTypes);
      browserHistory.push('/');
    }).catch((err) => {
      toastr.error('title already exist');
      dispatch({
        type: actionTypes.DOCUMENT_UPDATE_FAILED,
        status: 'failed',
        error: err.message
      });
      setLoading.isNotLoading(dispatch,actionTypes);
    });
  };
};