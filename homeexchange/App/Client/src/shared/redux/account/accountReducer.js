import {LOGIN_ERROR, LOGIN_USER, LOGOUT} from "./types";

const initialState = {};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, ...action.payload};
    case LOGIN_ERROR:
      return {...state, ...action.payload};
    case LOGOUT:
      return {}
    default:
      return state;
  }
};