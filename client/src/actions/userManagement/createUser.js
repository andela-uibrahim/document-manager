import axios from 'axios';
import actionTypes from '../actionTypes';

export const creationSuccessful = 
message => (
  { 
    type: actionTypes.USER_CREATED,
    message, 
  }
);

export default (userData) => {
  return (dispatch) => {
    return axios.post('/api/users', userData)
      .then((response) => {
          const message = response.data.message;
        dispatch(creationSuccessful(message));
      }).catch(() => {});
  };
};