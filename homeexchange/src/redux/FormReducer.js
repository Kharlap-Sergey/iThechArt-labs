import {LOGIN_USER, LOGOUT} from "./types";

const initialState = {};

export const FormReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, ...action.payload};
    case LOGOUT:
      return {}
    default:
      return state;
  }
};
