const initialState = { ads: [], ad: {} };
import { SET_AD, SET_ADS, CLEAR } from './constants';

export const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADS:
      return { ...state, ads: action.payload};
    case SET_AD:
      return { ...state, ad: action.payload };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
