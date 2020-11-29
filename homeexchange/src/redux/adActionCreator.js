import { AD_CLEAR, AD_GETALL } from "./types";

export function getAllAds() {
  return async dispatch => {
    const url = "https://localhost:44370/Ad/getall";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllAdsAction({ads: [...data]}));
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