import { combineReducers } from "redux";
import { FormReducer } from "./FormReducer";
import { adReducer } from "./adReducer";
export const rootReducer = combineReducers({
  accountForm: FormReducer,
  ads: adReducer
});
