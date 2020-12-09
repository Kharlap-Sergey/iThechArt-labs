import { requestWrapper } from "../../../utils/requestWrapper";
import {GET_ADS} from "./types";
export function getAds(page, userId){
  return async dispatch =>{
    const url = "https://localhost:44370/ad/getadspage/" + `${page}/${userId ?? ""}`;
    console.log("try to recieve data form", url )
    const response = await requestWrapper.get(url);
    if (response.ok) {
      //dispatch(isShouldBeUpdatedAction(true));
      const data = await response.json();
      console.log(data);
      dispatch(setAds(data));
    } else {
      //todo logic
    }
  }
}


export function setAds(ads){
  return {
    type: GET_ADS,
    payload: ads
  }
}

