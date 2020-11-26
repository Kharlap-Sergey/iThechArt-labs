import {LOGIN_USER} from "./types";

const initialState = {};

export const FormReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
