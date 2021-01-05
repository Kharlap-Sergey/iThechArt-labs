import { DELETE_BY_ID, NOTIFICATION_ADD, NOTIFICATION_CLEAR } from "./constants";

export const addNotificationsAction = (notifications) => ({
  type: NOTIFICATION_ADD,
  payload: notifications,
});

export const deleteNotificationByIdAction = (notificationId) => ({
  type: DELETE_BY_ID,
  payload: notificationId,
});
export const clearNotificationsAction = () => ({
  type: NOTIFICATION_CLEAR,
});
