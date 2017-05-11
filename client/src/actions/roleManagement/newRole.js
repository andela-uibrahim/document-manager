import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';
import setLoading from '../helper/setLoading';
/*eslint-disable no-undef*/
export default (details) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    setLoading.isLoading(dispatch,actionTypes);
    return axios.post('/api/roles/', details, {
      headers: {
        Authorization: token
      }
    })
      .then((role) => {
        toastr.info('Role successfully created ');
        dispatch({
          type: actionTypes.ROLE_CREATED,
          role,
          status: 'success'
        });
        setLoading.isNotLoading(dispatch,actionTypes);
        browserHistory.push('/roles');
      }).catch((err) => {
        dispatch({
          type: actionTypes.ROLE_CREATE_FAILED,
          status: 'failed',
          error: err.message
        });
        setLoading.isNotLoading(dispatch,actionTypes);
      });
  };
};