import {
  REMOTE_CLEAR,
  REMOTE_IS_LOADING,
  REMOTE_IS_SHOUL_BE_UPDATED,
} from "./types";

const initialState = { isShouldBeUpdate: false, isLoading: false };

export const remoteInteractionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOTE_IS_SHOUL_BE_UPDATED:
      return { ...state, ...action.payload };
    case REMOTE_IS_LOADING:
      return { ...state, ...action.payload };
    case REMOTE_CLEAR:
      return initialState;
    default:
      return state;
  }
};
