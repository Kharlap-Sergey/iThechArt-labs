import { pathApi } from "shared/utils/path";
import { requestWrapper } from "shared/utils/requestWrapper";
import { toastrNotifier } from "shared/redux/tostrNotifier";
import { disableAllAction, enableRegistrationActin } from "shared/redux/loader/actions";
import { setProfileByIdAction } from './actions';

export function getProfileById(userId) {
  return async (dispatch) => {
    dispatch(enableRegistrationActin());
    const url = pathApi.account.get(userId);
    const response = await requestWrapper.get(url);
    if (response.ok) {
      const data = await response.json();
      dispatch(setProfileByIdAction(data));
    } else {
      toastrNotifier.alertBadResponse(response);
    }
    dispatch(disableAllAction());
  };
}


