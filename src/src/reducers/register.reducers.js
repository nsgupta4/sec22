import {REGISTRATION_ERROR, REGISTRATION_LOADING, REGISTRATION} from '../helpers/registration.constants';

export default function(state =  { 
  'isSuccess': false, 
  'isError': false, 
  'isLoading': false
}, action) {
  switch (action.type) {
   case REGISTRATION:
    return {isLoading : false,'isError': false,'isSuccess': true};
    case REGISTRATION_ERROR:
      return {isLoading : false,'isError': true,'isSuccess': false}; 
    case REGISTRATION_LOADING:
      return {isLoading : true,'isError': false,'isSuccess': false}; 
    default:
      return state;
  }
}