import { pathApi } from "shared/utils/path";
import { requestWrapper } from "shared/utils/requestWrapper";
import { toastrNotifier } from "shared/redux/tostrNotifier";
import {
  setProfileRatingAction,
  updateProfileRatingAction,
} from "./actions";

export function loadProfileRating(profileId) {
  return async (dispatch) => {
    try {
      const url = pathApi.profileRating.get(profileId);
      const response = await requestWrapper.get(url);
      if (response.ok) {
        const data = await response.json();
        dispatch(setProfileRatingAction(data));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
    }
  };
}

export function setProfileRating(rating) {
  return async (dispatch) => {
    try {
      const url = pathApi.profileRating.set();
      const response = await requestWrapper.post(url, rating);
      if (response.ok) {
        const data = await response.json();
        dispatch(updateProfileRatingAction(data));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
    }
  };
}
