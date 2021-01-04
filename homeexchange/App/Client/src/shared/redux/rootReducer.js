import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { adReducer } from "./ad/reducer";
import { redirectReducer } from "./redirect/redirectReducer";
import { remoteInteractionReducer } from "./remoteInteraciton/remoteInteractionReducer";
import { profileReducer } from "./profile/profileReducer";
import { adsPageListReducer } from "../components/adsPageList/redux/adsPageListReducer";
import { accountReducer } from "./account/accountReducer";
import { notificationsReducer } from "./notifications/notificationsReducer";
import { chatReducer } from "./chat/reducer";
import { loaderReducer } from "./loader/loaderReducer";
import { profileRatingReducer } from "./profileRating/profileRatingReducer";
import { profileImgReducer } from "./imgUploader/profileImgReducer";
export const rootReducer = combineReducers({
  adsPageList: adsPageListReducer,
  ads: adReducer,
  chat: chatReducer,
  loader: loaderReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
  profileRating: profileRatingReducer,
  profileImg: profileImgReducer,
  redirect: redirectReducer,
  remoteInteraction: remoteInteractionReducer,
  toastr: toastrReducer,
  user: accountReducer,
});
