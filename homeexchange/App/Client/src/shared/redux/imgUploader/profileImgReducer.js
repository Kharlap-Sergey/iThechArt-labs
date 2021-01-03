import { CLEAR, SET, UPDATE } from "./types";

const initialState = {};

export const profileImgReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      const id = action.payload.profileId;
      const file = action.payload.file;
      const img = { [id]: file };
      return { ...state, ...img };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
