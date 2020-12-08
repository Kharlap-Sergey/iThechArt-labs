import { toastr } from "react-redux-toastr";
import { loginUserAction } from "../../redux/loginActionsCreator";
import { redirectToAction } from "../../shared/redux/redirect/redirectActionCreator";
import { requestWrapper } from "../../shared/utils/requestWrapper";
import { REGISTRATE_ERROR } from "../../redux/types";

export function registrateUserPost(user) {
  return async (dispatch) => {
    try {
      const url = "https://localhost:44370/Account/Create";
      const response = await requestWrapper.post(url, user);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(redirectToAction("/login"));
      } else {
        console.log("some");
        const data = await response.json();
        toastr.error(data.errorText, "");
        console.log(data.errorText);
      }
    } catch (e) {
      console.log(e);
      toastr.error("try again later", e.toString());
    }
  };
}

// export const registrationErrorAction = (error) => {
//   return {
//     type: REGISTRATE_ERROR,
//     payload: error,
//   };
// };
