import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { adReducer } from "./ad/adReducer";
import { redirectReducer } from "./redirect/redirectReducer";
import { remoteInteractionReducer } from "./remoteInteraciton/remoteInteractionReducer";
import { profileReducer } from "./profile/profileReducer";
import { adsPageListReducer } from "../components/adsPageList/redux/adsPageListReducer";
import { accountReducer } from "./account/accountReducer";
import { notificationsReducer } from "./notifications/notificationsReducer";
import { chatReducer } from "./chat/chatReducer";
import {loaderReducer} from "./loader/loaderReducer";
import { profileRatingReducer } from "./profileRating/profileRatingReducer";
export const rootReducer = combineReducers({
  user: accountReducer,
  notifications: notificationsReducer,
  ads: adReducer,
  toastr: toastrReducer,
  redirect: redirectReducer,
  remoteInteraction: remoteInteractionReducer,
  profile: profileReducer,
  profileRating: profileRatingReducer, 
  adsPageList: adsPageListReducer,
  chat: chatReducer,
  loader: loaderReducer
});
