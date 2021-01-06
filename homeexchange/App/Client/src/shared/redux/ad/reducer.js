import { SET_AD, SET_ADS, CLEAR } from "./constants";
import produce from "immer";

const initialState = {
  adsPage: { ads: [], hasNext: false, hasPrevious: false },
  ad: {},
};

export const adReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_ADS:
        draft.adsPage = action.payload;
        break;
      case SET_AD:
        draft.ad = action.payload;
        break;
      case CLEAR:
        draft.adsPage = initialState.adsPage;
        draft.ad = initialState.ad;
        break;
    }
  });
};
