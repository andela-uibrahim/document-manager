import axios from 'axios';
import actionTypes from '../actionTypes';
import setLoading from '../helper/setLoading';

export const creationSuccessful = 
message => (
  { 
    type: actionTypes.USER_CREATED,
    message, 
  }
);

export default (userData) => {
  return (dispatch) => {
    setLoading.isLoading(dispatch,actionTypes);
    return axios.post('/api/users', userData)
      .then((response) => {
          const message = response.data.message;
        dispatch(creationSuccessful(message));
        setLoading.isNotLoading(dispatch,actionTypes);
      }).catch(() => {});
  };
};