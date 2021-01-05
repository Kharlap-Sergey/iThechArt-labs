import { LOGIN_ERROR, LOGIN_USER, LOGOUT } from "./constants";
export const loginUserAction = (user) => {
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