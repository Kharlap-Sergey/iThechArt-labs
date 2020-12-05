import { combineReducers } from "redux";
import { FormReducer } from "../../redux/FormReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import { adReducer } from "./ad/adReducer";
import { redirectReducer } from "./redirect/redirectReducer";
import { remoteInteractionReducer } from "./remoteInteraciton/remoteInteractionReducer";
import { profileReducer } from "./profile/profileReducer";
import { adsPageListReducer } from "../components/adsPageList/redux/adsPageListReducer";

export const rootReducer = combineReducers({
  user: FormReducer,
  ads: adReducer,
  toastr: toastrReducer,
  redirect: redirectReducer,
  remoteInteraction: remoteInteractionReducer,
  profile: profileReducer,
  adsPageList: adsPageListReducer,
});
