import {
  DISABLE_ALL,
  ENABLE_ADFORM,
  ENABLE_LOGIN,
  ENABLE_PAGE_LIST,
  ENABLE_REGISTRATION,
} from "./types";

const initialState = {
  login: false,
  registration: false,
  pageList: false,
  adForm: false,
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_LOGIN:
      return { ...state, login: true };
    case ENABLE_REGISTRATION:
      return { ...state, registration: true };
    case ENABLE_PAGE_LIST:
      return { ...state, pageList: true };
    case ENABLE_ADFORM:
      return { ...state, adForm: true };
    case DISABLE_ALL:
      return initialState;
    default:
      return state;
  }
};
