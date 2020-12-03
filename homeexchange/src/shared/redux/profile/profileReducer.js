import {USER_CLEAR, USER_GET_BY_ID} from "./types";

const initialState = {};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_GET_BY_ID:
      return { ...state, ...action.payload };
    case USER_CLEAR:
      return initialState;
    default:
      return state;
  }
};
