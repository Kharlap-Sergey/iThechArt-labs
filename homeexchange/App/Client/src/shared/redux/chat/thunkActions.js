import { pathApi } from "../../utils/path";
import { requestWrapper } from "../../utils/requestWrapper";
import { redirectToAction } from "../redirect/redirectActionCreator";
import { path } from "../../utils/path";
import { addChatListAction, addChatMessagesAction } from "./actions";
import { toastrNotifier } from "../tostrNotifier";

export function loadChatList() {
  return async (dispatch) => {
    try {
      const url = pathApi.chat.loadChatList;
      const response = await requestWrapper.get(url);
      if (response.ok) {
        const data = await response.json();
        dispatch(addChatListAction(data));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    }
  };
}

export function loadPrivateRoomId(member1, member2) {
  return async (dispatch) => {
    try {
      const url = pathApi.chat.loadChatId;
      const response = await requestWrapper.post(url, { member1, member2 });
      if (response.ok) {
        const data = await response.json();
        dispatch(redirectToAction(path.chat(data)));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    }
  };
}

export function loadChatMessages(chatId) {
  return async (dispatch) => {
    try {
      const url = pathApi.chat.loadChatMessages + `/${chatId}`;
      const response = await requestWrapper.get(url);
      if (response.ok) {
        const data = await response.json();
        dispatch(addChatMessagesAction(data));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    }
  };
}
