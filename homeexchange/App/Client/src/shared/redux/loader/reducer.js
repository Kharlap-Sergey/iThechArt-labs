import produce from "immer";
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
  return produce(state, (draft) => {
    switch (action.type) {
      case ENABLE_LOGIN:
        draft.login = true;
        break;
      case ENABLE_REGISTRATION:
        draft.registration = true;
        break;
      case ENABLE_AD:
        draft.ad = true;
        break;
      case ENABLE_ADFORM:
        draft.adForm = true;
        break;
      case DISABLE_ALL:
        draft.login = initialState.login;
        draft.ad = initialState.ad;
        draft.adForm = initialState.adForm;
        draft.registration = initialState.registration    
        break;
    }
  });
};
