import { CLEAR, SET, UPDATE } from "./types";

const initialState = {};

export const profileImgReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET:
            const id = 1;
            const file = "";
            const img = {id: file} 
            return {...state, ...img};
        case CLEAR:
            return initialState;
        default:
            return state;
    }
};