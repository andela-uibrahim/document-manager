/*eslint-disable no-undef*/
import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';
import setLoading from '../helper/setLoading';

export default (details) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    setLoading.isLoading(dispatch,actionTypes);
    return axios.post('/api/documents', details, {
      headers: {
        Authorization: token
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.DOCUMENT_CREATED,
          status: 'success',
        });
        setLoading.isNotLoading(dispatch,actionTypes);
        browserHistory.push('/');
      }).catch((err) => {
        dispatch({
          type: actionTypes.DOCUMENT_CREATE_FAILED,
          status: 'failed',
          error: err.message
        });
        setLoading.isNotLoading(dispatch,actionTypes);
      });
  };
};
