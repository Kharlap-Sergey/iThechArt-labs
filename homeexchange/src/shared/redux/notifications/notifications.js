import { pathApi } from "../../utils/path";
import { requestWrapper } from "./../../utils/requestWrapper";
import { addNotificationsAction, deleteNotificationByIdAction } from "./notificationActions";
import { toastr } from 'react-redux-toastr';

export function getNotificationsFetch() {
  return async (dispatch) => {
    try {
      const url = pathApi.notifications.get;
      const response = await requestWrapper.get(url);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        
        dispatch(addNotificationsAction([...data]));
      } else {
        const data = await response.json();
        toastr.error(data.errorText, "");
      }
    } catch (e) {
      console.log(e);
      toastr.error("try again later", e.toString());
    }
  };
}


export function deleteNotificationFetch(notificationId) {
  return async (dispatch) => {
    try {
      const url = pathApi.notifications.delete(notificationId);
      console.log('url', url)
      const response = await requestWrapper.delete(url);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        dispatch(deleteNotificationByIdAction(notificationId));
      } else {
        const data = await response.json();
        toastr.error(data.errorText, "");
      }
    } catch (e) {
      console.log(e);
      toastr.error("try again later", e.toString());
    }
  };
}