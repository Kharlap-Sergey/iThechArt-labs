import { SET_CHAT_LIST, ADD_MESSAGES } from "./types";
export function setChatList(chatList) {
  return {
    type: SET_CHAT_LIST,
    payload: chatList,
  };
}
export function addChatMessagesAction(messages) {
  return {
    type: ADD_MESSAGES,
    payload: messages,
  };
}