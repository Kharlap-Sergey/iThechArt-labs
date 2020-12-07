import { auth } from './../../auth/auth';
import { requestWrapper } from './../../shared/utils/requestWrapper';
import { redirectToAction } from './../../shared/redux/redirect/redirectActionCreator';
import { toastr } from 'react-redux-toastr';
export function updateAd(ad) {
  return async (dispatch) => {
    try {
      const url = "https://localhost:44370/ad/update";
      const token = auth.getToken();
      const response = await requestWrapper.post(url, ad, token);
      console.log(response);
      if (response.ok) {
        dispatch(redirectToAction("/"));
      } else {
        console.log("some");
        toastr.error("some eroor");
      }
    } catch (e) {
      console.log(e);
      toastr.error("try again later", e.toString());
    }
  };
}