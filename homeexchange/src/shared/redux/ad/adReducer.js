import { AD_CLEAR, AD_GET, AD_GETALL, AD_GETOWN } from "./types";

const initialState = { ownAds: [], ads: [], ad: {} };

export const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case AD_GETALL:
      return { ...state, ...action.payload };
    case AD_GETOWN:
      return { ...state, ...action.payload };
    case AD_GET:
      return { ...state, ...action.payload };
    case AD_CLEAR:
      return initialState;
    default:
      return state;
  }
};
