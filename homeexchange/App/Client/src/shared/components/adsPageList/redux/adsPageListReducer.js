import { CLEAR, GET_ADS } from "./types";

const initialState = {ads: [], haveNext: false, havePrevious: false};

export const adsPageListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADS:
      return {...action.payload};
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
