import { REMOTE_IS_SHOUL_BE_UPDATED, REMOTE_IS_LOADING } from "./types";

export function isShouldBeUpdatedAction(flag) {
  return {
    type: REMOTE_IS_SHOUL_BE_UPDATED,
    payload: { isShouldBeUpdate: flag },
  };
}
export function startLoadingAction() {
  return {
    type: REMOTE_IS_LOADING,
    payload: { isLoading: true },
  };
}
export function endLoadingAction() {
  return {
    type: REMOTE_IS_LOADING,
    payload: { isLoading: false },
  };
}