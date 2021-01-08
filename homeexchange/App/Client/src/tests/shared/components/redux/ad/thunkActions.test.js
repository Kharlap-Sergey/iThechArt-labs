import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as thunkActions from "shared/redux/ad/thunkActions";
import fetchMock from "fetch-mock";
import { path, pathApi } from "shared/utils/path";
import {
  disableAllAction,
  enableAdFromtActin,
} from "shared/redux/loader/actions";
import { redirectToAction } from "shared/redux/redirect/actions";
import { setAdAction } from "shared/redux/ad/actions";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("test thunk actions", () => {
  const mockAd = {
    id: 1,
    title: "some",
    discription: "some",
    dateOfPublication: 1610126126734,
    type: 1,
    userId: 1,
  };
  const mockAds = [
    {
      id: 1,
      title: "some",
      discription: "some",
      dateOfPublication: 1610126126734,
      type: 1,
      userId: 1,
    },
    {
      id: 2,
      title: "some 1",
      discription: "some 1",
      dateOfPublication: 1610126122734,
      type: 1,
      userId: 1,
    },
  ];
  const initialStore = {
    ads: {
      ad: mockAd,
      adsPage: {
        hasNext: false,
        hasPrevious: false,
        ads: [],
      },
    },
  };

  afterEach(() => {
    fetchMock.restore();
  });
  it("test create new ad to bew not permited", () => {
    fetchMock.postOnce(pathApi.ad.create, {
      status: 401,
      body: { text: "some" },
      headers: { "content-type": "application/json" },
    });

    const expectActions = [enableAdFromtActin(), disableAllAction()];
    const store = mockStore(initialStore);

    store.dispatch(thunkActions.createNewAd(mockAd)).then(() => {
      expect(store.getActions()).toBe(expectActions);
    });
  });

  it("test create new ad to be success", () => {
    fetchMock.postOnce(pathApi.ad.create, {
      body: { text: "some" },
      headers: { "content-type": "application/json" },
    });

    const expectActions = [
      enableAdFromtActin(),
      redirectToAction(path.home),
      disableAllAction(),
    ];
    const store = mockStore(initialStore);

    store.dispatch(thunkActions.createNewAd(mockAd)).then(() => {
      expect(store.getActions()).toBe(expectActions);
    });
  });

  it("test get ad to be success", () => {
    const mockAdId = 2;
    fetchMock.getOnce(pathApi.ad.get(mockAdId), {
      body: { text: mockAds[1] },
      headers: { "content-type": "application/json" },
    });

    const expectActions = [
      enableAdFromtActin(),
      setAdAction(mockAds[1]),
      disableAllAction(),
    ];

    const store = mockStore(initialStore);

    store.dispatch(thunkActions.getAd(mockAdId)).then(() => {
      expect(store.getActions()).toBe(expectActions);
    });
  });

  it("test get ad to be error", () => {
    const mockAdId = 2;
    fetchMock.getOnce(pathApi.ad.get(mockAdId), {
      status: 404,
      body: { text: mockAds[1] },
      headers: { "content-type": "application/json" },
    });

    const expectActions = [
      enableAdFromtActin(),
      disableAllAction(),
    ];

    const store = mockStore(initialStore);

    store.dispatch(thunkActions.getAd(mockAdId)).then(() => {
      expect(store.getActions()).toBe(expectActions);
    });
  });
});
