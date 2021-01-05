import {
  PROFILE_CLEAR,
  PROFILE_GET_ADS_FOR_PROFILE,
  PROFILE_GET_BY_ID,
} from "./constants";

const initialState = { ads: [] };

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_GET_BY_ID:
      return { ...state, ...action.payload, ads: state.ads };
    case PROFILE_GET_ADS_FOR_PROFILE:
      return { ...state, ads: action.payload };
    case PROFILE_CLEAR:
      return initialState;
    default:
      return state;
  }
};
