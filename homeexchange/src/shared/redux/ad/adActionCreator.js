import { requestWrapper } from "../../utils/requestWrapper";
import { AD_CLEAR, AD_GET, AD_GETALL} from "./types";
import {startLoadingAction, endLoadingAction, isShouldBeUpdatedAction} from "../remoteInteraciton/remoteInteractionActionCreator"
import { redirectToAction } from './../redirect/redirectActionCreator';
import { auth } from './../../utils/auth';

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
export function getAd(adId){
  return async (dispatch) => {
    dispatch(startLoadingAction());
    const url = "https://localhost:44370/Ad/get/" + adId;
    const token = auth.getToken();
    const response = await requestWrapper.get(url, token);
    if (response.ok) {
      const data = await response.json();
      console.log("ad -", data);
      dispatch(setAdAction({ ad: data }));
    } else {
      //todo logic
    }
    dispatch(endLoadingAction());
  };
}

export function deleteAd(adId) {
  return async (dispatch) => {
    const url = "https://localhost:44370/Ad/delete/" + adId;
    const token = auth.getToken();
    const response = await requestWrapper.deleteByIdQueryParam(url, token);
    if (response.ok) {
      dispatch(redirectToAction('/'));
    } else {
      //todo logic
    }
  };
}
export function updateAd(adId) {
  return async (dispatch) => {
    const url = "https://localhost:44370/Ad/update/";
    const token = auth.getToken();
    const response = await requestWrapper.deleteByIdQueryParam(url, token);
    if (response.ok) {
      dispatch(redirectToAction('/'));
    } else {
      //todo logic
    }
  };
}
export function replyOnAd(adId){
  return async (dispatch) => {
    const url = "https://localhost:44370/Ad/reply/" + adId;
    const token = auth.getToken();
    const response = await requestWrapper.post(url, {}, token);
    if (response.ok) {
      //dispatch(isShouldBeUpdatedAction(true));
    } else {
      //todo logic
    }
  };
}
export function getAdsForUserByUserId(userId){
  return async (dispatch) => {
    dispatch(startLoadingAction());
    const url = "https://localhost:44370/Ad/get/" + userId;
    const token = auth.getToken();
    const response = await requestWrapper.post(url, {}, token);
    if (response.ok) {
      //dispatch(isShouldBeUpdatedAction(true));
    } else {
      //todo logic
    }
    dispatch(endLoadingAction());
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
    payload: ad
  };
}
