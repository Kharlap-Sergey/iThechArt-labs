import { LOGIN_ERROR, LOGIN_USER, LOGOUT } from "./constants";
import produce from "immer";

const initialState = {date: {}};

export const accountReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_USER:
        draft.date = action.payload;
        break;
      case LOGOUT:
        draft.date = initialState.date;
        break;
    }
  });
};
