import {
  PROFILE_GET_BY_ID,
  PROFILE_GET_ADS_FOR_PROFILE,
  PROFILE_CLEAR,
} from "./constants";

export function setProfileByIdAction(user) {
  return {
    type: PROFILE_GET_BY_ID,
    payload: user,
  };
}

export function setAdsForProfile(ads) {
  return {
    type: PROFILE_GET_ADS_FOR_PROFILE,
    payload: ads,
  };
}

export function cleareProfileAction() {
  return {
    type: PROFILE_CLEAR,
  };
}
