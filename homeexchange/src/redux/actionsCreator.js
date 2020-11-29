import { auth } from "../auth/auth";
import { LOGIN_USER, LOGOUT } from "./types";

export function loginUserPost(user) {
  return async dispatch => {
    const url = "https://localhost:44370/Account/Login";
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

      auth.setToken(data.jwt);
      dispatch(loginUserAction(
        {
          username: data.user.email,
          userId: data.user.id
        }));
    }
  }
}

export const loginUserAction = (user) => {
  console.log(user)
  return {
    type: LOGIN_USER,
    payload: user
  }
}

export const logoutAction = () => {
  return {
    type: LOGOUT
  }
}