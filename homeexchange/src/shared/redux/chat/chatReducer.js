import { ADD_MESSAGES, CLEAR, ADD_CHATS } from "./types";

const initialState = {
  chats: {},
  messages: [],
};

export const chatReducer = (state = initialState, action) => {
  console.log('action.payload', action)
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
      console.log("chats", { ...state.chats, ...chats });
      return { ...state, chats: { ...state.chats, ...chats } };
    case ADD_MESSAGES:
      console.log('action.payload', action.payload)
      console.log('state', state)
      const chatts = {};
      action.payload.forEach(e => {
        console.log('e', state.chats[e.chatId]);
        if (state.chats[e.chatId]) {
          state.chats[e.chatId].message = e
          chatts[e.chatId] = (state.chats[e.chatId])
        }
      })
      console.log('state', state)
      return { ...state, messages: [...state.messages, ...action.payload], chats: { ...state.chats, ...chatts } };
    case CLEAR:
      console.log("clear", initialState);
      return initialState;
    default:
      return state;
  }
};
