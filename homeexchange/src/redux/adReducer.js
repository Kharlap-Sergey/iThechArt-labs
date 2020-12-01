import { AD_CLEAR, AD_GETALL, AD_GETOWN, AD_ISUPDATING, AD_UPDATE } from "./types";

const initialState = { isShouldBeUpdate: false, isUpdating: false, ownAds: []};

export const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case AD_GETALL:
      return { ...state, ...action.payload };
    case AD_GETOWN:
      return { ...state, ...action.payload };
    case AD_UPDATE:
      return { ...state, ...action.payload };
    case AD_ISUPDATING:
      return { ...state, ...action.payload };
    case AD_CLEAR:
      return initialState;
    default:
      return state;
  }
};
