import axios from 'axios';
import {LOGIN_ERROR, LOGIN_LOADING, LOGIN} from '../helpers/login.constants';
import {LOGIN_USER_DETAILS} from '../helpers/user.constants';

const API_BASE_URL = 'http://localhost:3001/users';

function login(data) {
  return (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
    payload: true
  });
  axios.get(API_BASE_URL,{
    params:data
  })
  .then(function (response) {
    if(response.data && response.data[0]){
    localStorage.setItem('user', JSON.stringify(response.data[0]));
    dispatch({
        type: LOGIN_USER_DETAILS,
        payload: response.data[0]
    });  
    }
    dispatch({
      type: LOGIN,
      payload: response.data
  });
  })
  .catch(function (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: true
  });
  });
}
}

export const loginActions = {
    login
};