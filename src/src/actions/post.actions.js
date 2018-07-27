import axios from 'axios';
import { ToastStore} from 'react-toasts';
import {GET_POSTS, POST_ERROR, POST_LOADING,EMPTY_POST, LOAD_MORE_FALSE} from '../helpers/post.constants';
const BASE_API = 'http://localhost:3001/posts';

function getPosts(userId, startLimit = 0, searchTerm = '') {
  return (dispatch) => {
  dispatch({
      type: POST_LOADING,
      payload: true
  });
  axios.get(searchTerm === '' ? `${BASE_API}?userId=${userId}&_start=${startLimit}&_limit=5&_sort=id&_order=desc`: `${BASE_API}?userId=${userId}&_sort=id&_order=desc&q=${searchTerm}`)
  .then(function (response) {
    dispatch({
      type: GET_POSTS,
      payload: response
    });
    if(searchTerm !== ''){
      dispatch({
        type: LOAD_MORE_FALSE,
        payload: false
      });
    }
  })
  .catch(function (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
  });
  });
}
}

function createPost(values,history) {
  return (dispatch) => {
    axios.post(BASE_API, values)
    .then(function (response) {
      dispatch(emptyPost());
     // dispatch(getPosts(values.userId));
      ToastStore.success('Post, Post added successfully !');
      history.push(`/dashboard?userId=${values.userId}`);
    }).catch(function (error) {
      ToastStore.error('Post, Somtehing wrong !');
  });
}
}

function updatePost(values,history) {
  return (dispatch) => {
    axios.put(`${BASE_API}/${values.id}`,values)
    .then(function (response) {
      dispatch(emptyPost());
    //  dispatch(getPosts(values.userId));
      ToastStore.success('Post, Post updated successfully !');
      history.push(`/dashboard?userId=${values.userId}`);
    }).catch(function (error) {
      ToastStore.error('Post, Somtehing wrong !');
  });
}
}

function deletePost(values,history) {
  return (dispatch) => {
    axios.delete(`${BASE_API}/${values.id}`)
    .then(function (response) {
      console.log("post deleted successfull");
      dispatch(emptyPost());
      dispatch(getPosts(values.userId));
      console.log("posts get successfull");
    }).catch(function (error) {
      ToastStore.error('Post, Somtehing wrong !');
  });
}
}

function emptyPost(){
  return (dispatch) => {
  dispatch({
    type: EMPTY_POST,
    payload: []
  });
}
}

export const postActions = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    emptyPost
};