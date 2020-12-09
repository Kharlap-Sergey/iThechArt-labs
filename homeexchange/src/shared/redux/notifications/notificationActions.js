import { NOTIFICATION_ADD, NOTIFICATION_CLEAR } from "./types";

export const addNotificationsAction = (notifications) => ({
  type: NOTIFICATION_ADD,
  payload: notifications,
});

export const clearNotificationsAction = () => ({
  type: NOTIFICATION_CLEAR,
});
