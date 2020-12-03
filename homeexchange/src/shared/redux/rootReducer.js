import { combineReducers } from "redux";
import { FormReducer } from "../../redux/FormReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import { adReducer } from "./ad/adReducer";
import { redirectReducer } from "./redirect/redirectReducer";
import { remoteInteractionReducer } from "./remoteInteraciton/remoteInteractionReducer";

export const rootReducer = combineReducers({
  accountForm: FormReducer,
  ads: adReducer,
  toastr: toastrReducer,
  redirect: redirectReducer,
  remoteInteraction: remoteInteractionReducer,
});
