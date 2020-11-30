import { auth } from "../auth/auth";
import { loginUserAction } from "./loginActionsCreator";
import { requestWrapper } from "./requestWrapper";
import { REGISTRATE_ERROR } from "./types";

export function registrateUserPost(user) {
  return async dispatch => {
    const url = "https://localhost:44370/Account/Create";
    const response = await requestWrapper.post(url, user);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
    else{
        //todo logic
    }
  }
}

export const registrationErrorAction = (error) =>{
  return {
    type: REGISTRATE_ERROR,
    payload: error
  }
}
