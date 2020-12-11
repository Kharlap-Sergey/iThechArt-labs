import { ADD_MESSAGES, CLEAR, SET_CHAT_LIST } from "./types";

const initialState = {
  chatList: [],
  messages: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_LIST:
      return { ...state, chatList: [...action.payload] };
    case ADD_MESSAGES:
      return { ...state, messages: [...state.messages, ...action.payload] }
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
