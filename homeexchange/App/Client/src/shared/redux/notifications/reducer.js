import { NOTIFICATION_CLEAR, NOTIFICATION_ADD, DELETE_BY_ID } from "./constants";

const initialState = [];

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_ADD:
      return state.concat(action.payload);
    case DELETE_BY_ID:
      return state.filter((not) => not.id !== action.payload);
    case NOTIFICATION_CLEAR:
      return initialState;
    default:
      return state;
  }
};
