import { pathApi } from "../../utils/path";
import { requestWrapper } from "./../../utils/requestWrapper";
import { addNotificationsAction } from "./notificationActions";
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
