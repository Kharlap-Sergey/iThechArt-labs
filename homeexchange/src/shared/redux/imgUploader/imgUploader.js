import { toastr } from "react-redux-toastr";
import { pathApi } from "../../utils/path";
import { requestWrapper } from "../../utils/requestWrapper";
import { setProfileImgAction } from "./profileImgReducerActionCreator";

export function sendFile(file, authorId) {
  return async (dispatch) => {
    try {
      const url = pathApi.img.send();
      const response = await requestWrapper.postFiles(url, file);
      if (response.ok) {
        dispatch(downloadFile(authorId));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
    }
  };
}

export function downloadFile(profileId) {
  return async (dispatch) => {
    try {
      const url = pathApi.img.get(profileId);
      const response = await requestWrapper.getFile(url);
      if (response.ok) {
        const data = await response.blob();
        var reader = new FileReader();

        reader.onload = function (event) {
          dispatch(setProfileImgAction(event.target.result, profileId));
        };

        reader.readAsDataURL(data);
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
    }
  };
}
