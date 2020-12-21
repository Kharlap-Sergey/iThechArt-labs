import { toastr } from "react-redux-toastr";
import { pathApi } from "../../utils/path";
import { requestWrapper } from "../../utils/requestWrapper";
import { setProfileImgAction } from "./profileImgReducerActionCreator";

export function sendFile(file) {
  return async (dispatch) => {
    try {
      const url = pathApi.img.send();
      console.log("url", url);
      const response = await requestWrapper.postFiles(url, file);
      if (response.ok) {
        const data = await response.json();
      } else {
        toastr.error("", "");
      }
    } catch (e) {
      toastr.error("some", "");
    } finally {
    }
  };
}

export function downloadFile(profileId) {
  return async (dispatch) => {
    try {
      const url = pathApi.img.get(profileId);
      console.log("url", url);
      const response = await requestWrapper.getFile(url);
      console.log("response", response);
      if (response.ok) {
        const data = await response.blob();
        console.log("data", data);
        var reader = new FileReader();

        reader.onload = function (event) {
          console.log("event.target", event.target.result);
          dispatch(setProfileImgAction(event.target.result, profileId))
        };

        reader.readAsDataURL(data);
      } else {
        toastr.error("", "");
      }
    } catch (e) {
      toastr.error("some", "");
    } finally {
    }
  };
}
