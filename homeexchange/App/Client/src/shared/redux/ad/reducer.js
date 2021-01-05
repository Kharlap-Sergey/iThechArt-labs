import { SET_AD, SET_ADS, CLEAR } from "./constants";

const initialState = {
  adsPage: { ads: [], hasNext: false, hasPrevious: false },
  ad: {},
};

export const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADS:
      return { ...state, adsPage: action.payload };
    case SET_AD:
      return { ...state, ad: action.payload };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
