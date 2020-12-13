import { path, pathApi } from './../../utils/path';
import { auth } from './../../utils/auth';
import { requestWrapper } from './../../utils/requestWrapper';
import { redirectToAction } from './../redirect/redirectActionCreator';
import { toastr } from 'react-redux-toastr';
import { loginUserAction } from './accountActions';
import { disableAllAction, enableLoginAction} from "../loader/loaderActionCreator"

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
        const data = await response.json();
        toastr.error(data.errorText, "");
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
      const url = pathApi.account.registrate;
      const response = await requestWrapper.post(url, user);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(redirectToAction("/login"));
      } else {
        console.log("some");
        const data = await response.json();
        toastr.error(data.errorText, "");
        console.log(data.errorText);
      }
    } catch (e) {
      console.log(e);
      toastr.error("try again later", e.toString());
    }
  };
}