import { func } from "prop-types";
import { requestWrapper } from "../../utils/requestWrapper";
import { endLoadingAction, startLoadingAction } from "../remoteInteraciton/remoteInteractionActionCreator";
import {USER_GET_BY_ID} from "./types";

export function getProfileById(userId){
  return async dispatch =>{
    dispatch(startLoadingAction());
    const url = "https://localhost:44370/account/get/" + userId;
    console.log("try to recieve data form", url )
    const response = await requestWrapper.get(url);
    if (response.ok) {
      //dispatch(isShouldBeUpdatedAction(true));
      const data = await response.json();
      dispatch(setProfileByIdAction(data));
    } else {
      //todo logic
    }
    dispatch(endLoadingAction());
  }
}

export function setProfileByIdAction(user){
  return {
    type: USER_GET_BY_ID,
    payload: user
  }
}
