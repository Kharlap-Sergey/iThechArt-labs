import {
  enablePageListActin,
  disableAllAction,
} from "shared/redux/loader/loaderActionCreator";
import { pathApi } from "shared/utils/path";
import { requestWrapper } from "shared/utils/requestWrapper";
import { CLEAR, GET_ADS } from "./types";
import { toastrNotifier } from "shared/redux/tostrNotifier";

export function getAds(page, type, searchString, authorId) {
  return async (dispatch) => {
    try {
      dispatch(enablePageListActin());
      const url = pathApi.ad.loadPage();
      const data = {
        filter: { type, authorId },
        searchString,
        page,
      };
      const response = await requestWrapper.post(url, data);
      if (response.ok) {
        const data = await response.json();
        dispatch(setAds(data));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
      dispatch(disableAllAction());
    }
  };
}

export function setAds(ads) {
  return {
    type: GET_ADS,
    payload: ads,
  };
}

export function clearAdsPageAction(ads) {
  return {
    type: CLEAR,
    payload: ads,
  };
}
