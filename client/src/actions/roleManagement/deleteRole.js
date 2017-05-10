import axios from 'axios';
import actionTypes from '../actionTypes';
import setLoading from '../helper/setLoading';
/*eslint-disable no-undef*/
export default (roleId) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    setLoading.isLoading(dispatch,actionTypes);
    return axios.delete(`/api/roles/${roleId}`, {
      headers: {
        Authorization: token
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.ROLE_DELETED,
          roleId,
          status: 'success'
        });
        setLoading.isNotLoading(dispatch,actionTypes);
      }).catch((err) => {
        dispatch({
          type: actionTypes.ROLE_DELETION_FAILED,
          status: 'failed',
          error: err.message
        });
        setLoading.isNotLoading(dispatch,actionTypes);
      });
  };
};