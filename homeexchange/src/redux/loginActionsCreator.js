import { auth } from "../auth/auth";
import { LOGIN_ERROR, LOGIN_USER, LOGOUT } from "./types";
import { toastr } from "react-redux-toastr";
import { requestWrapper } from "./requestWrapper";
import { redirectToAction } from "./redirectActionCreator";
import { endLoadingAction, startLoadingAction } from "./remoteInteractionActionCreator";

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
        auth.setToken(data.jwt);
        dispatch(
          loginUserAction({
            username: data.user.email,
            userId: data.user.id,
          })
        );
        dispatch(redirectToAction("/"));
      } else {
        console.log("some");
        const data = await response.json();
        toastr.error(data.errorText, "");
        console.log(data.errorText)
        //todo logic
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
