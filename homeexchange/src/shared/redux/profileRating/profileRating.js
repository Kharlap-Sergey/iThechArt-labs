import { toastr } from "react-redux-toastr";
import { pathApi } from "../../utils/path"
import { requestWrapper } from "../../utils/requestWrapper";
import { setProfileRatingAction, updateProfileRatingAction } from "./profileRatingActionCreator";

export function loadProfileRating(profileId){
    return async dispatch => {
        try{
            const url = pathApi.profileRating.get(profileId);
            console.log('url', url);
            const response = await requestWrapper.get(url);
            if(response.ok){
                const data = await response.json();
                dispatch(setProfileRatingAction(data));
            }else{
                toastr.error("", "");
            }
        }catch(e){

        }finally{

        }
    }
}

export function setProfileRating(rating){
    return async dispatch => {
        try{
            const url = pathApi.profileRating.set();
            const response = await requestWrapper.post(url, rating);
            console.log('rating', rating)
            if(response.ok){
                const data = await response.json();
                dispatch(updateProfileRatingAction(data));
            }else{
                toastr.error("", "");
            }
        }catch(e){

        }finally{

        }
    }
}