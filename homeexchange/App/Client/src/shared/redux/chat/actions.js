import {  ADD_MESSAGES, ADD_CHATS, CLEAR } from "./constants";

export function addChatMessagesAction(messages) {
  return {
    type: ADD_MESSAGES,
    payload: messages,
  };
}
export function addChatListAction(chats) {
  return {
    type: ADD_CHATS,
    payload: chats,
  };
}
export function clearChatAction() {
  return {
    type: CLEAR,
  };
}
