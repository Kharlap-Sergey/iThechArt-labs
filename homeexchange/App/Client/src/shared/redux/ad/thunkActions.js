import { requestWrapper } from "shared/utils/requestWrapper";
import { redirectToAction } from "shared/redux/redirect/actions";
import { pathApi, path } from "shared/utils/path";
import {
  enableAdFromtActin,
  disableAllAction,
  enableAdLoader,
} from "shared/redux/loader/actions";
import { toastrNotifier } from "shared/redux/tostrNotifier";
import { setAdAction, setAdsAction } from "./actions";

export function createNewAd(ad) {
  return async (dispatch) => {
    try {
      dispatch(enableAdFromtActin());
      const url = pathApi.ad.create;
      const response = await requestWrapper.post(url, ad);
      if (response.ok) {
        dispatch(redirectToAction(path.home));
      } else {
        await toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
      dispatch(disableAllAction());
    }
  };
}

export function getAd(adId) {
  return async (dispatch) => {
    dispatch(enableAdFromtActin());
    try {
      const url = pathApi.ad.get(adId);
      const response = await requestWrapper.get(url);
      if (response.ok) {
        const data = await response.json();
        dispatch(setAdAction(data));
      } else {
        const data = await response.json();
        toastrNotifier.alertBadResponse(response);
        dispatch(redirectToAction(path.Profile));
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
      dispatch(disableAllAction());
    }
  };
}

export function updateAd(ad) {
  return async (dispatch) => {
    dispatch(enableAdFromtActin());
    try {
      const url = pathApi.ad.update();

      const response = await requestWrapper.post(url, ad);
      if (response.ok) {
        dispatch(redirectToAction(path.profile));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
      dispatch(disableAllAction());
    }
  };
}

export function deleteAd(adId) {
  return async (dispatch) => {
    const url = pathApi.ad.delete(adId);
    const response = await requestWrapper.delete(url);
    if (response.ok) {
      dispatch(redirectToAction(path.home));
    } else {
      toastrNotifier.alertBadResponse(response);
    }
  };
}

export function replyOnAd(adId) {
  return async (dispatch) => {
    const url = pathApi.ad.replyOnAd(adId);
    const response = await requestWrapper.post(url, {});
    if (response.ok) {
      dispatch(redirectToAction(path.home));
    } else {
      toastrNotifier.alertBadResponse(response);
    }
  };
}

export function getAds(page, type, searchString, authorId) {
  return async (dispatch) => {
    try {
      dispatch(enableAdLoader());
      const url = pathApi.ad.loadPage();
      const data = {
        filter: { type, authorId, searchString },
        page,
      };
      const response = await requestWrapper.post(url, data);
      if (response.ok) {
        const data = await response.json();
        dispatch(setAdsAction(data));
      } else {
        toastrNotifier.alertBadResponse(response);
      }
    } catch (e) {
      toastrNotifier.tryAgainLater();
    } finally {
      dispatch(disableAllAction());
    }
  };
}
