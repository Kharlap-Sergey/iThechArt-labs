import { CLEAR, SET, UPDATE } from "./types";

const initialState = [];

export const profileRatingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET:
            return [ ...state, ...action.payload ];
        case UPDATE:
            return [ ...state.push(action.payload)];
        case CLEAR:
            return initialState;
        default:
            return state;
    }
};