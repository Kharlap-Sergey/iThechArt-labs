import { CLEAR, GET_ADS } from "./types";

const initialState = {ads: []};

export const adsPageListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADS:
      return {ads:[...action.payload]};
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
