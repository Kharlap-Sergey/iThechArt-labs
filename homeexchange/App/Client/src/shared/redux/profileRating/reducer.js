import { CLEAR, SET, UPDATE } from "./constants";

const initialState = [];

export const profileRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return [...action.payload];
    case UPDATE:
      const votes = [...state];
      let isPresent = false;
      for (let i = 0; i < votes.length; i++) {
        if (
          votes[i].targetId === action.payload.targetId &&
          votes[i].committerId === action.payload.committerId
        ) {
          votes[i] = action.payload;
          isPresent = true;
        }
      }
      if (!isPresent) votes.push(action.payload);
      return [...votes];
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
