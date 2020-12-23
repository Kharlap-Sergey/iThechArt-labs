import { redirectToAction } from "./../../shared/redux/redirect/redirectActionCreator";
import { requestWrapper } from "./../../shared/utils/requestWrapper";
import { path, pathApi } from './../../shared/utils/path';
import { toastrNotifier } from './../../shared/redux/tostrNotifier';

export function updateUserPost(user) {
  return async (dispatch) => {
    try {
      const url = pathApi.account.update;
      const response = await requestWrapper.post(url, user);
      if (response.ok) {
        dispatch(redirectToAction(path.profile.to(user.id)));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    }
  };
}
