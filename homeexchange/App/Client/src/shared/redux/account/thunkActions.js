import { path, pathApi } from "../../utils/path";
import { auth } from "shared/utils/auth";
import { requestWrapper } from "shared/utils/requestWrapper";
import { redirectToAction } from "shared/redux/redirect/actions";
import { loginUserAction } from "./actions";
import {
  disableAllAction,
  enableLoginAction,
  enableRegistrationActin,
} from "shared/redux/loader/actions";
import { toastrNotifier } from "shared/redux/tostrNotifier";

export function loginUserPost(user) {
  return async (dispatch) => {
    dispatch(enableLoginAction());
    try {
      const url = pathApi.account.login;
      const response = await requestWrapper.post(url, user);
      if (response.ok) {
        const data = await response.json();
        auth.setToken(data.jwt);
        dispatch(
          loginUserAction({
            email: data.user.email,
            userId: data.user.id,
          })
        );
        dispatch(redirectToAction(path.home));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
      dispatch(disableAllAction());
    }
  };
}

export function registrateUserPost(user) {
  return async (dispatch) => {
    try {
      dispatch(enableRegistrationActin());
      const url = pathApi.account.registrate;
      const response = await requestWrapper.post(url, user);

      if (response.ok) {
        dispatch(redirectToAction(path.login));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
      dispatch(disableAllAction());
    }
  };
}

export function updateUserPost(user) {
  return async (dispatch) => {
    try {
      dispatch(enableRegistrationActin());
      const url = pathApi.account.update;
      const response = await requestWrapper.post(url, user);
      if (response.ok) {
        dispatch(redirectToAction(path.profile.to(user.id)));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
      dispatch(disableAllAction());
    }
  };
}