import {
  DISABLE_ALL,
  ENABLE_ADFORM,
  ENABLE_LOGIN,
  ENABLE_AD,
  ENABLE_REGISTRATION,
} from "./constants";

const initialState = {
  login: false,
  registration: false,
  ad: false,
  adForm: false,
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_LOGIN:
      return { ...state, login: true };
    case ENABLE_REGISTRATION:
      return { ...state, registration: true };
    case ENABLE_AD:
      return { ...state, ad: true };
    case ENABLE_ADFORM:
      return { ...state, adForm: true };
    case DISABLE_ALL:
      return initialState;
    default:
      return state;
  }
};
