import { combineReducers } from "redux";
import { loginFormReducer } from "./FormReducer";
import { FormReducer } from "./FormReducer";
export const rootReducer = combineReducers({
  accountForm: FormReducer,
});
