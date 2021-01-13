import * as signalR from "@microsoft/signalr";
import { requestWrapper } from "shared/utils/requestWrapper";
import { redirectToAction } from "shared/redux/redirect/actions";
import { path, pathHub, pathApi } from "shared/utils/path";
import { addChatListAction, addChatMessagesAction } from "./actions";
import { toastrNotifier } from "shared/redux/tostrNotifier";
import { auth } from "shared/utils/auth";

const chatHub = new signalR.HubConnectionBuilder()
  .withUrl(pathHub.chat, {
    transport: signalR.HttpTransportType.WebSockets,
    accessTokenFactory: () => auth.getToken(),
  })
  .build();

export const connectToChat = () => {
  return async (dispatch) => {
    await chatHub.start().catch((err) => {});
    if (!chatHub.methods.recieve)
      await chatHub.on("Receive", function ReciveMessage(message) {
        dispatch(addChatMessagesAction([message]));
      });
  };
};
export const disconnectFromChat = () => {
  return async (dispatch) => {
    await chatHub.stop();
  };
};
export const sendMessageToChat = (message) => {
  return async () => {
    await chatHub.invoke("Send", message);
  };
};

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
