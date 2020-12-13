import { requestWrapper } from './../../shared/utils/requestWrapper';
import { redirectToAction } from './../../shared/redux/redirect/redirectActionCreator';
import { toastr } from 'react-redux-toastr';
import { path, pathApi } from './../../shared/utils/path';

export function updateAd(ad) {
  return async (dispatch) => {
    try {
      const url = pathApi.ad.update;
      const response = await requestWrapper.post(url, ad);
      console.log(response);
      if (response.ok) {
        dispatch(redirectToAction("/"));
      } else {
        console.log("some");
        toastr.error("some eroor", response.status);
      }
    } catch (e) {
      console.log(e);
      toastr.error("try again later", e.toString());
    }
  };
}