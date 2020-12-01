import { auth } from "../auth/auth";
import { redirectToHomeFromAction } from "./redirectActionCreator";
import { requestWrapper } from "./requestWrapper";
import { AD_CLEAR, AD_GETALL, AD_GETOWN, AD_ISUPDATING, AD_UPDATE } from "./types";

export function getAllAds() {
  return async (dispatch) => {
    //dispatch(isUpdateAction(true));
    const url = "https://localhost:44370/Ad/getall";
    const response = await requestWrapper.get(url);
    if (response.ok) {
      const data = await response.json();
      dispatch(setAllAdsAction({ ads: [...data] }));
    } else {
      //todo logic
    }
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
    dispatch(isUpdateingAction(true));
    const url = "https://localhost:44370/Ad/getown";
    const token = auth.getToken();
    const response = await requestWrapper.get(url, token);
    if (response.ok) {
      const data = await response.json();
      dispatch(isUpdateAction(false));
      dispatch(isUpdateingAction(false));
      dispatch(setOwnAdsAction({ ownAds: [...data] }));
    } else {
      //todo logic
    }
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
      dispatch(isUpdateAction(true));
    } else {
      //todo logic
    }
  };
}

export function isUpdateAction(flag) {
  return {
    type: AD_UPDATE,
    payload: { isShouldBeUpdate: flag },
  };
}
export function isUpdateingAction(flag) {
  return {
    type: AD_ISUPDATING,
    payload: { isUpdating: flag },
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
