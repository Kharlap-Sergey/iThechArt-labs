import { auth } from "../auth/auth";
import { requestWrapper } from "./requestWrapper";
import { AD_CLEAR, AD_GETALL } from "./types";

export function getAllAds() {
  return async dispatch => {
    const url = "https://localhost:44370/Ad/getall";
    const response = await requestWrapper.get(url);
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllAdsAction({ads: [...data]}));
    }else{
      //todo logic
    }
  }
}
export function createNewAd(ad) {
  return async dispatch => {
    const url = "https://localhost:44370/Ad/Create";
    const token = auth.getToken();
    const response = await requestWrapper.post(url, ad, token);
    if (response.ok) {
      const data = await response.json();
    }else{
      //todo logic
    }
  }
}
export function getAllAdsAction(ads){
    return {
        type: AD_GETALL,
        payload: ads
    }
}

export function clearAdsAction(ads){
    return {
        type: AD_CLEAR,
        payload: ads
    }
}