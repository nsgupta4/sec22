import axios from 'axios';
import { ToastStore} from 'react-toasts';
import {GET_USERS, USER_ERROR, USER_LOADING, LOGIN_USER_DETAILS} from '../helpers/user.constants';
const BASE_API = 'http://localhost:3001/users';

function getUsers() {
  return (dispatch) => {
  dispatch({
      type: USER_LOADING,
      payload: true
  });
  axios.get(BASE_API)
  .then(function (response) {
    dispatch({
      type: GET_USERS,
      payload: response
    });
  })
  .catch(function (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
  });
  });
}
}

function updateProfile(values,history) {
    return (dispatch) => {
      axios.put(`${BASE_API}/${values.id}`,values)
      .then(function (response) {
        localStorage.setItem('user', JSON.stringify(values));
        dispatch({
            type: LOGIN_USER_DETAILS,
            payload: values
        });  
        ToastStore.success('Profile, Profile updated successfully !');
        history.push(`/dashboard?userId=${values.id}`);
      }).catch(function (error) {
        ToastStore.error('Profile, Somtehing wrong !');
    });
  }
  }

  function changePassword(values,history) {
    return (dispatch) => {
      axios.put(`${BASE_API}/${values.id}`,values)
      .then(function (response) {
        localStorage.setItem('user', JSON.stringify(values));
        dispatch({
            type: LOGIN_USER_DETAILS,
            payload: values
        });  
        ToastStore.success('Profile, Password updated successfully !');
        history.push(`/dashboard?userId=${values.id}`);
      }).catch(function (error) {
        ToastStore.error('Profile, Somtehing wrong !');
    });
  }
  }

  function updateLoginUserDetails(){
    return (dispatch) => {   
   let loginUser = JSON.parse(localStorage.getItem('user'));
    dispatch({
        type: LOGIN_USER_DETAILS,
        payload: loginUser
    });  
  }
}

export const userActions = {
    getUsers,
    changePassword,
    updateProfile,
    updateLoginUserDetails
};