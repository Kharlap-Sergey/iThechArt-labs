import { ADD_MESSAGES, CLEAR, ADD_CHATS } from "./types";

const initialState = {
  chats: [],
  messages: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHATS:
      return { ...state, chats: [...action.payload] };
    case ADD_MESSAGES:
      return { ...state, messages: [...state.messages, ...action.payload] }
    case CLEAR:
      console.log('clear', initialState)
      return initialState;
    default:
      return state;
  }
};
