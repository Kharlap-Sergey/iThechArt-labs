import {LOGIN_USER} from "./types";

export const loginUserAction = (user) => {
    console.log(user)
    return {
      type: LOGIN_USER,
      payload: user
    }
}