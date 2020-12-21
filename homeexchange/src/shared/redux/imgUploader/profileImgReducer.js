import { CLEAR, SET, UPDATE } from "./types";

const initialState = {};

export const profileImgReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      const id = action.payload.profId;
      const file = action.payload.file;
      const img = { id: id, file: file };
      return { ...state, ...img };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
