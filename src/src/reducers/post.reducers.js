import { GET_POSTS, POST_ERROR, POST_LOADING,EMPTY_POST, LOAD_MORE_FALSE } from "../helpers/post.constants";

export default function(state = {isLoading : false,'isError': false,'isSuccess': false, posts: []}, action) {
  switch (action.type) {
    case EMPTY_POST:
    return {isLoading : false,'isError': false,'isSuccess': false, posts: [], hasMore: true }; 
    case GET_POSTS:
    return {isLoading : false,'isError': false,'isSuccess': false, posts: state.posts.concat(action.payload.data), hasMore: action.payload.data.length ? true: false  }; 
    case POST_ERROR:
      return {isLoading : false,'isError': true,'isSuccess': false, posts: state.posts , hasMore: true }; 
    case POST_LOADING:
    return {isLoading : true,'isError': false,'isSuccess': false, posts: state.posts , hasMore: true}; 
    case LOAD_MORE_FALSE:
    return {isLoading : false,'isError': false,'isSuccess': false, posts: state.posts, hasMore: false  }; 
    default:
      return state;
  }
}