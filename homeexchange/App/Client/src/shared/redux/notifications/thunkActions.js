import { pathApi } from "../../utils/path";
import { requestWrapper } from "../../utils/requestWrapper";
import { addNotificationsAction, deleteNotificationByIdAction } from "./actions";
import { toastrNotifier } from '../tostrNotifier';

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