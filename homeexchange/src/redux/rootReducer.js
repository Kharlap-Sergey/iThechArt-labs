import { combineReducers } from "redux";
import { FormReducer } from "./FormReducer";
import { adReducer } from "./adReducer";
import {reducer as toastrReducer} from 'react-redux-toastr'
import { redirectReducer } from "./redirectReducer";
export const rootReducer = combineReducers({
  accountForm: FormReducer,
  ads: adReducer,
  toastr: toastrReducer,
  redirect: redirectReducer
});
