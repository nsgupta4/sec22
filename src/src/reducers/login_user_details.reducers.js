import {LOGIN_USER_DETAILS } from "../helpers/user.constants";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER_DETAILS:
      return action.payload;
    default:
      return state;
  }
}