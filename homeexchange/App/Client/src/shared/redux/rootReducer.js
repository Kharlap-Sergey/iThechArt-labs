import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { adReducer } from "./ad/reducer";
import { redirectReducer } from "./redirect/reducer";
import { profileReducer } from "./profile/reducer";
import { accountReducer } from "./account/reducer";
import { notificationsReducer } from "./notifications/reducer";
import { chatReducer } from "./chat/reducer";
import { loaderReducer } from "./loader/reducer";
import { profileRatingReducer } from "./profileRating/reducer";
import { profileImgReducer } from "./imgUploader/reducer";
export const rootReducer = combineReducers({
  ads: adReducer,
  chat: chatReducer,
  loader: loaderReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
  profileRating: profileRatingReducer,
  profileImg: profileImgReducer,
  redirect: redirectReducer,
  toastr: toastrReducer,
  user: accountReducer,
});
