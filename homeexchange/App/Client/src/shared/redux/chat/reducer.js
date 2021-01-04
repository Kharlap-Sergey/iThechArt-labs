import { ADD_MESSAGES, CLEAR, ADD_CHATS } from "./constants";

const initialState = {
  chats: {},
  messages: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHATS:
      const chats = {};
      action.payload.forEach((chat) => {
        chats[chat.chat.id] = {
          id: chat.chat.id,
          title: chat.chat.title,
          message: chat.lastMessage,
        };
      });
      return { ...state, chats: { ...state.chats, ...chats } };
    case ADD_MESSAGES:
      const chatts = {};
      action.payload.forEach(e => {
        if (state.chats[e.chatId]) {
          state.chats[e.chatId].message = e
          chatts[e.chatId] = (state.chats[e.chatId])
        }
      })
      return { ...state, messages: [...state.messages, ...action.payload], chats: { ...state.chats, ...chatts } };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
