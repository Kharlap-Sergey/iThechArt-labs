import { redirectToAction } from "./../../shared/redux/redirect/redirectActionCreator";
import { toastr } from "react-redux-toastr";
import { requestWrapper } from "./../../shared/utils/requestWrapper";
import { auth } from "./../../shared/utils/auth";

export function updateUserPost(user) {
  return async (dispatch) => {
    try {
      const url = "https://localhost:44370/Account/update";
      const token = auth.getToken();
      const response = await requestWrapper.post(url, user, token);
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
