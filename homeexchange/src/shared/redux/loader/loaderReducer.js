import { DISABLE_ALL, ENABLE_LOGIN, ENABLE_REGISTRATION } from "./types";

const initialState = { login: false, registration: false};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_LOGIN:
      return { ...state, login: true }
    case ENABLE_REGISTRATION:
      return { ...state, registration: true }
    case DISABLE_ALL:
      return initialState;
    default:
      return state;
  }
};
