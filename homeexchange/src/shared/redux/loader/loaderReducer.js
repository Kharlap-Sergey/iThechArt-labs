import { DISABLE_ALL, ENABLE_LOGIN } from "./types";

const initialState = {login: false};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_LOGIN:
        return {...state, login: true}
    case DISABLE_ALL:
      return initialState;
    default:
      return state;
  }
};
