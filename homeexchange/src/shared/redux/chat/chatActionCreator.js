import { SET_CHAT_LIST } from "./types";
export function setChatList(chatList) {
  return {
    type: SET_CHAT_LIST,
    payload: chatList,
  };
}
