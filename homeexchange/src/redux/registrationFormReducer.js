import {CHENGE_REG } from "./types";

const initialState = {};

export const registrationFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHENGE_REG:
      return {...state, ...action.value};
    default:
      return state;
  }
};