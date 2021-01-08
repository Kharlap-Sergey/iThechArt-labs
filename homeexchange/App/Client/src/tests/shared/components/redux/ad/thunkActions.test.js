import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as thunkActions from "shared/redux/ad/thunkActions";
import fetchMock from "fetch-mock";
import { path, pathApi } from "shared/utils/path";
import { disableAllAction, enableAdFromtActin } from "shared/redux/loader/actions";
import { redirectToAction } from "shared/redux/redirect/actions";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe("test thunk actions", () => {
  const mockAd = {
    id: 1,
    title: "some",
    discription: "some",
    dateOfPublication: Date.now().toString(),
    type: 1,
    userId: 1,
  };
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

    const expectActions = [
      enableAdFromtActin(),
      disableAllAction(),
    ]
    const store = mockStore(initialStore);

    store.dispatch(thunkActions.createNewAd(mockAd)).then(()=>{
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
    ]
    const store = mockStore(initialStore);

    store.dispatch(thunkActions.createNewAd(mockAd)).then(()=>{
      expect(store.getActions()).toBe(expectActions);
    });
  });
});
