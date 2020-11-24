import {CHENGE} from "./types";

const initialState = {};

export const FormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHENGE:
      return {...state, ...action.value};
    default:
      return state;
  }
};
