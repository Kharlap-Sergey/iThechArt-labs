import { pathApi } from "../../utils/path";
import { toastr } from "react-redux-toastr";
import { requestWrapper } from "./../../utils/requestWrapper";

export function loadChatList() {
  return async (dispatch) => {
    try {
      const url = pathApi.loadChatList;
      const response = await requestWrapper.get(url);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
      } else {
        const data = await response.json();
        toastr.error(data.errorText, "");
      }
    } catch (e) {
      console.log(e);
      toastr.error();
    }
  };
}
