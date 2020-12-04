import { func } from "prop-types";
import { requestWrapper } from "../../utils/requestWrapper";
import { endLoadingAction, startLoadingAction } from "../remoteInteraciton/remoteInteractionActionCreator";
import {PROFILE_GET_BY_ID, PROFILE_GET_ADS_FOR_PROFILE} from "./types";

export function getProfileById(userId){
  return async dispatch =>{
    dispatch(startLoadingAction());
    const url = "https://localhost:44370/account/get/" + userId;
    console.log("try to recieve data form", url )
    const response = await requestWrapper.get(url);
    if (response.ok) {
      const data = await response.json();
      dispatch(setProfileByIdAction(data));
    } else {
      //todo logic
    }
    dispatch(endLoadingAction());
  }
}

export function getAdsForProfileByUserId(userId){
  return async dispatch =>{
    dispatch(startLoadingAction());
    const url = "https://localhost:44370/ad/getForUser/" + userId;
    console.log("try to recieve data form", url )
    const response = await requestWrapper.get(url);
    if (response.ok) {
      //dispatch(isShouldBeUpdatedAction(true));
      const data = await response.json();
      console.log(data);
      dispatch(setAdsForProfile(data));
    } else {
      //todo logic
    }
    dispatch(endLoadingAction());
  }
}

export function setProfileByIdAction(user){
  return {
    type: PROFILE_GET_BY_ID,
    payload: user
  }
}

export function setAdsForProfile(ads){
  return {
    type: PROFILE_GET_ADS_FOR_PROFILE,
    payload: ads
  }
}

