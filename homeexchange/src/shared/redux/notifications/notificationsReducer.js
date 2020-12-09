import { NOTIFICATION_CLEAR, NOTIFICATION_ADD } from "./types";

const initialState = [];

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_ADD:
      return state.concat(action.payload);
    case NOTIFICATION_CLEAR:
      return initialState;
    default:
      return state;
  }
};
