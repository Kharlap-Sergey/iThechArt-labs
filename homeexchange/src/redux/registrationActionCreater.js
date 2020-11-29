import { auth } from "../auth/auth";
import { loginUserAction } from "./loginActionsCreator";
import { REGISTRATE_ERROR } from "./types";

export function registrateUserPost(user) {
  return async dispatch => {
    const url = "https://localhost:44370/Account/Create";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    }
    const response = await fetch(url, options);
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
