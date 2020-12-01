import { toastr } from "react-redux-toastr";
import { auth } from "../auth/auth";
import { loginUserAction } from "./loginActionsCreator";
import { redirectToAction } from "./redirectActionCreator";
import { requestWrapper } from "./requestWrapper";
import { REGISTRATE_ERROR } from "./types";

export function registrateUserPost(user) {
  return async (dispatch) => {
    try {
      const url = "https://localhost:44370/Account/Create";
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

export const registrationErrorAction = (error) => {
  return {
    type: REGISTRATE_ERROR,
    payload: error,
  };
};
