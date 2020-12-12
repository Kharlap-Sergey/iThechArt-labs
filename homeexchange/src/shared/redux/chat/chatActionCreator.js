import {  ADD_MESSAGES, ADD_CHATS } from "./types";
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
