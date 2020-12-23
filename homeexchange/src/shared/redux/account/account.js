import { path, pathApi } from './../../utils/path';
import { auth } from './../../utils/auth';
import { requestWrapper } from './../../utils/requestWrapper';
import { redirectToAction } from './../redirect/redirectActionCreator';
import { toastr } from 'react-redux-toastr';
import { loginUserAction } from './accountActions';
import { disableAllAction, enableLoginAction, enableRegistrationActin } from "../loader/loaderActionCreator"
import { toastrNotifier } from '../tostrNotifier';

export function loginUserPost(user) {
  return async (dispatch) => {
    dispatch(enableLoginAction())
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
      console.log(e);
      toastr.error("try again later", e.toString());
    }
    dispatch(disableAllAction())
  };
}

export function registrateUserPost(user) {
  return async (dispatch) => {
    try {
      dispatch(enableRegistrationActin())
      const url = pathApi.account.registrate;
      const response = await requestWrapper.post(url, user);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(redirectToAction(path.login));
      } else {
        console.log("some");
        const data = await response.json();
        toastr.error(data.errorText, "");
        console.log(data.errorText);
      }
    } catch (e) {
      console.log(e);
      toastr.error("try again later", e.toString());
    }finally {
      dispatch(disableAllAction());
    }
  };
}