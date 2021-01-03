import { SET_ADS } from './constants';

export function setAdsAction(ads) {
  return {
    type: SET_ADS,
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