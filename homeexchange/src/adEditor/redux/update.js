import { requestWrapper } from './../../shared/utils/requestWrapper';
import { redirectToAction } from './../../shared/redux/redirect/redirectActionCreator';
import { pathApi } from '../../shared/utils/path';
import { path } from './../../shared/utils/path';
import { toastrNotifier } from './../../shared/redux/tostrNotifier';

export function updateAd(ad) {
  return async (dispatch) => {
    try {
      const url = pathApi.ad.update;
      const response = await requestWrapper.post(url, ad);
      if (response.ok) {
        dispatch(redirectToAction(path.home()));
      } else {
        toastrNotifier.alertBadResponse(response)
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    }
  };
}