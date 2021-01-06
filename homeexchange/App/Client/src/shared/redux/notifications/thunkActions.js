import { requestWrapper } from "shared/utils/requestWrapper";
import { addNotificationsAction, deleteNotificationByIdAction } from "./actions";
import { toastrNotifier } from 'shared/redux/tostrNotifier';
import * as signalR from "@microsoft/signalr";
import { pathHub, pathApi } from "shared/utils/path";
import { auth } from "shared/utils/auth";

const chatHub = new signalR.HubConnectionBuilder()
  .withUrl(pathHub.notification, {
    transport: signalR.HttpTransportType.WebSockets,
    accessTokenFactory: () => auth.getToken(),
  })
  .build();

export const connectToNotification = () => {
  return async (dispatch) => {
    await chatHub.start().catch((err) => {});
    if (!chatHub.methods.recieve)
      await chatHub.on("Notify", (notification) => {
        this.props.addNotificationsAction([notification]);
      });
  };
};
export const disconnectFromNotification = () => {
  return async (dispatch) => {
    await chatHub.stop();
  };
};

export function getNotificationsFetch() {
  return async (dispatch) => {
    try {
      const url = pathApi.notifications.get;
      const response = await requestWrapper.get(url);
      if (response.ok) {
        const data = await response.json();
        
        dispatch(addNotificationsAction([...data]));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater()
    } finally {
    }
  };
}


export function deleteNotificationFetch(notificationId) {
  return async (dispatch) => {
    try {
      const url = pathApi.notifications.delete(notificationId);
      const response = await requestWrapper.delete(url);
      if (response.ok) {
        const data = await response.json();
        dispatch(deleteNotificationByIdAction(notificationId));
      }else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater()
    } finally {
    }
  };
}