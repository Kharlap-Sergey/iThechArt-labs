import { REDIRECT_TO, REDIRECT_CLEAR } from "./constants";

const initialState = { path: "" };

export const redirectReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDIRECT_TO:
      return { ...state, ...action.payload };
    case REDIRECT_CLEAR:
      return initialState;
    default:
      return state;
  }
};
