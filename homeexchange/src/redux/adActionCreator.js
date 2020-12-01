import { auth } from "../auth/auth";
import { requestWrapper } from "./requestWrapper";
import { AD_CLEAR, AD_GETALL, AD_GETOWN } from "./types";
import {startLoadingAction, endLoadingAction, isShouldBeUpdatedAction} from "./remoteInteractionActionCreator"

export function getAllAds() {
  return async (dispatch) => {
    dispatch(startLoadingAction());
    const url = "https://localhost:44370/Ad/getall";
    const response = await requestWrapper.get(url);
    if (response.ok) {
      const data = await response.json();
      dispatch(setAllAdsAction({ ads: [...data] }));
    } else {
      //todo logic
    }
    dispatch(endLoadingAction());
  };
}
export function createNewAd(ad) {
  return async (dispatch) => {
    const url = "https://localhost:44370/Ad/Create";
    const token = auth.getToken();
    const response = await requestWrapper.post(url, ad, token);
    if (response.ok) {
      const data = await response.json();
    } else {
      //todo logic
    }
  };
}
export function getOwnAds() {
  return async (dispatch) => {
    dispatch(startLoadingAction());
    const url = "https://localhost:44370/Ad/getown";
    const token = auth.getToken();
    const response = await requestWrapper.get(url, token);
    if (response.ok) {
      const data = await response.json();
      dispatch(isShouldBeUpdatedAction(false));
   
      dispatch(setOwnAdsAction({ ownAds: [...data] }));
    } else {
      //todo logic
    }
    dispatch(endLoadingAction());
  };
}
export function deleteOwnAd(adId) {
  return async (dispatch) => {
    //const url = "https://localhost:44370/Ad/delete" + "?id=" + adId;
    const url = "https://localhost:44370/Ad/delete/" + adId;
    const token = auth.getToken();
    const response = await requestWrapper.deleteByIdQueryParam(url, token);
    if (response.ok) {
      //dispatch(clearAdsAction());
      dispatch(isShouldBeUpdatedAction(true));
    } else {
      //todo logic
    }
  };
}

export function setAllAdsAction(ads) {
  return {
    type: AD_GETALL,
    payload: ads,
  };
}
export function setOwnAdsAction(ads) {
  return {
    type: AD_GETOWN,
    payload: ads,
  };
}
export function clearAdsAction() {
  return {
    type: AD_CLEAR,
  };
}
