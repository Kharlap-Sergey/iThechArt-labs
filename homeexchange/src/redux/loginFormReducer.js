import {CHENGE_LOGIN} from "./types";

const initialState = {};

export const loginFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHENGE_LOGIN:
      return {...state, ...action.value};
    default:
      return state;
  }
};
