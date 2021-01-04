import { SET_ADS, CLEAR, SET_AD } from './constants';

export function setAdsAction(ads) {
  return {
    type: SET_ADS,
    payload: ads,
  };
}

export function clearAdsAction() {
  return {
    type: CLEAR,
  };
}

export function setAdAction(ad) {
  return {
    type: SET_AD,
    payload: ad,
  };
}