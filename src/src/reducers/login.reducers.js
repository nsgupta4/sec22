import {LOGIN_ERROR, LOGIN_LOADING, LOGIN} from '../helpers/login.constants';
export default function(state =  { 
  'isSuccess': false, 
  'isError': false, 
  'isLoading': false,
  'user': null
}, action) {
  switch (action.type) {
   case LOGIN:
    return {isLoading : false,'isError': false,'isSuccess': true,'user': action.payload};
    case LOGIN_ERROR:
      return {isLoading : false,'isError': true,'isSuccess': false,'user': null}; 
    case LOGIN_LOADING:
      return {isLoading : true,'isError': false,'isSuccess': false,'user': null}; 
    default:
      return state;
  }
}