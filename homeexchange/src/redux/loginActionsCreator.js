import { toastr } from "react-redux-toastr";
import { auth } from "../auth/auth";

import { LOGIN_ERROR, LOGIN_USER, LOGOUT } from "./types";
import { requestWrapper } from "../shared/utils/requestWrapper";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import { endLoadingAction, startLoadingAction } from "../shared/redux/remoteInteraciton/remoteInteractionActionCreator";

export function loginUserPost(user) {
  return async (dispatch) => {
    dispatch(startLoadingAction())
    try {
      const url = "https://localhost:44370/Account/Login";
      const response = await requestWrapper.post(url, user);
      console.log("send");
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        auth.setToken(data.jwt);
        dispatch(
          loginUserAction({
            email: data.user.email,
            userId: data.user.id,
          })
        );
        dispatch(redirectToAction("/"));
      } else {
        console.log("some");
        const data = await response.json();
        toastr.error(data.errorText, "");
        console.log(data.errorText)
      }
    } catch (e) {
      console.log(e);
      toastr.error("try again later", e.toString());
    }
    dispatch(endLoadingAction())
  }; 
}

export const loginUserAction = (user) => {
  console.log(user);
  return {
    type: LOGIN_USER,
    payload: user,
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};
