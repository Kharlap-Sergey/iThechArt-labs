import { requestWrapper } from "../../utils/requestWrapper";
import { AD_CLEAR, AD_GET, AD_GETALL } from "./types";
import {
  startLoadingAction,
  endLoadingAction,
} from "../remoteInteraciton/remoteInteractionActionCreator";
import { redirectToAction } from "./../redirect/redirectActionCreator";
import { pathApi, path } from "../../utils/path";
import {
  enableAdFromtActin,
  disableAllAction,
} from "../loader/loaderActionCreator";
import { toastrNotifier } from "./../tostrNotifier";

export function createNewAd(ad) {
  return async (dispatch) => {
    try {
      dispatch(enableAdFromtActin());
      const url = pathApi.ad.create;
      const response = await requestWrapper.post(url, ad);
      if (response.ok) {
        dispatch(redirectToAction(path.profile));
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
export function getAd(adId) {
  return async (dispatch) => {
    try {
      const url = pathApi.ad.get(adId);
      const response = await requestWrapper.get(url);
      if (response.ok) {
        const data = await response.json();
        dispatch(setAdAction({ ad: data }));
      } else {
        const data = await response.json();
        toastrNotifier.alertBadResponse(response);
        dispatch(redirectToAction(path.Profile));
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    }
  };
}

export function deleteAd(adId) {
  return async (dispatch) => {
    const url = pathApi.ad.delete(adId);
    const response = await requestWrapper.delete(url);
    if (response.ok) {
      dispatch(redirectToAction(path.home));
    } else {
      toastrNotifier.alertBadResponse(response);
    }
  };
}
export function replyOnAd(adId) {
  return async (dispatch) => {
    const url = pathApi.ad.replyOnAd(adId);
    const response = await requestWrapper.post(url, {});
    if (response.ok) {
      dispatch(redirectToAction(path.home));
    } else {
      toastrNotifier.alertBadResponse(response);
    }
  };
}
export function setAllAdsAction(ads) {
  return {
    type: AD_GETALL,
    payload: ads,
  };
}
export function clearAdsAction() {
  return {
    type: AD_CLEAR,
  };
}
export function setAdAction(ad) {
  return {
    type: AD_GET,
    payload: ad,
  };
}
