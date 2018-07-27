import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PostsReducer from "./post.reducers";
import UserReducer from "./user.reducers";
import LoginReducer from "./login.reducers";
import RegisterReducer from "./register.reducers";
import loginUserReducer from "./login_user_details.reducers";

const rootReducer = combineReducers({
  form: formReducer,
  posts: PostsReducer,
  login: LoginReducer,
  register: RegisterReducer,
  users: UserReducer,
  loginUser: loginUserReducer
});

export default rootReducer;
