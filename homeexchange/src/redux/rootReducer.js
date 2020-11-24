import { combineReducers } from "redux";
import { loginFormReducer } from "./loginFormReducer";
import { registrationFormReducer } from "./registrationFormReducer";
export const rootReducer = combineReducers({
  registrationForm: registrationFormReducer,
  loginForm: loginFormReducer,
});
