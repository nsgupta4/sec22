import { GET_USERS, USER_ERROR, USER_LOADING } from "../helpers/user.constants";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload.data;
    case USER_ERROR:
      return action;
    case USER_LOADING:
      return action;
    default:
      return state;
  }
}