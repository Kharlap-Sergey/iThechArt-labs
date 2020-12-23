import { toastr } from "react-redux-toastr";
import { pathApi } from "../../utils/path";
import { requestWrapper } from "../../utils/requestWrapper";
import {
  setProfileRatingAction,
  updateProfileRatingAction,
} from "./profileRatingActionCreator";
import { toastrNotifier } from "./../tostrNotifier";

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
