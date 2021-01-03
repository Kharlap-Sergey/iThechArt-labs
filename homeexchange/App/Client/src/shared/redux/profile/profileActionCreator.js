import { pathApi } from "../../utils/path";
import { requestWrapper } from "../../utils/requestWrapper";
import {
  endLoadingAction,
  startLoadingAction,
} from "../remoteInteraciton/remoteInteractionActionCreator";
import {
  PROFILE_GET_BY_ID,
  PROFILE_GET_ADS_FOR_PROFILE,
  PROFILE_CLEAR,
} from "./types";
import { toastrNotifier } from "./../tostrNotifier";
import { disableAllAction, enableRegistrationActin } from "../loader/loaderActionCreator";

export function getProfileById(userId) {
  return async (dispatch) => {
    dispatch(enableRegistrationActin());
    const url = pathApi.account.get(userId);
    const response = await requestWrapper.get(url);
    if (response.ok) {
      const data = await response.json();
      dispatch(setProfileByIdAction(data));
    } else {
      toastrNotifier.alertBadResponse(response);
    }
    dispatch(disableAllAction());
  };
}

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
