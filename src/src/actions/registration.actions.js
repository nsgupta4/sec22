import axios from 'axios';
import {REGISTRATION_ERROR, REGISTRATION_LOADING, REGISTRATION} from '../helpers/registration.constants';
const API_BASE_URL = 'http://localhost:3001/users';

function register(data) {
  return (dispatch) => {
  dispatch({
    type: REGISTRATION_LOADING,
    payload: true
  });
  axios.post(API_BASE_URL,data)
  .then(function (response) {
    dispatch({
      type: REGISTRATION,
      payload: response
  });
  })
  .catch(function (error) {
    dispatch({
      type: REGISTRATION_ERROR,
      payload: true
  });
  });
}
}

export const registrationActions = {
  register
};