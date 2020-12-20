import { toastr } from "react-redux-toastr";
import { pathApi } from "../../utils/path"
import { requestWrapper } from "../../utils/requestWrapper";

export function sendFile(file){
    return async dispatch => {
        try{
            const url = pathApi.img.send();
            console.log('url', url);
            const response = await requestWrapper.postFiles(url, file);
            if(response.ok){
                const data = await response.json();
            }else{
                toastr.error("", "");
            }
        }catch(e){

        }finally{

        }
    }
}