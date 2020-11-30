import { AD_CLEAR, AD_GETALL, AD_GETOWN } from "./types";

const initialState = {};

export const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case AD_GETALL:
      return {...state, ...action.payload};
    case AD_GETOWN:
      return {...state, ...action.payload};
    case AD_CLEAR:
      return {}
    default:
      return state;
  }
};
