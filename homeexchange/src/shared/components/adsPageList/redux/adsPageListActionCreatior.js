import { enablePageListActin, disableAllAction } from "../../../redux/loader/loaderActionCreator";
import { pathApi } from "../../../utils/path";
import { requestWrapper } from "../../../utils/requestWrapper";
import { CLEAR, GET_ADS } from "./types";
import {toastr} from "react-redux-toastr";

export function getAds(page, userId, type) {
  type = 0;
  return async dispatch => {
    try {
      dispatch(enablePageListActin());
      const url = pathApi.ad.loadPage(page, userId, type ?? 0);

      const response = await requestWrapper.get(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setAds(data));
      } else {
        
      }
    } catch(e) {
      toastr.error("try again later", e.message)
    } finally {
      dispatch(disableAllAction());
    }
  }
}


export function setAds(ads) {
  return {
    type: GET_ADS,
    payload: ads
  }
}


export function clearAdsPageAction(ads) {
  return {
    type: CLEAR,
    payload: ads
  }
}

