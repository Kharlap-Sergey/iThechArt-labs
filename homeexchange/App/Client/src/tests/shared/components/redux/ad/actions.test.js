import * as actions from "shared/redux/ad/actions";
import * as types from "shared/redux/ad/constants";

describe("test ad actions", () => {
  it("should create an action to clear", () => {
    const expectedAction = {
      type: types.CLEAR,
    };

    expect(actions.clearAdsAction()).toEqual(expectedAction);
  });

  it("should create an action to add an ad", () => {
    const mockAd = {
      id: 1,
      title: "some",
      discription: "some",
      dateOfPublication: Date.now().toString(),
      type: 1,
      userId: 1,
    };
    const expectedAction = {
      type: types.SET_AD,
      payload: mockAd,
    };

    expect(actions.setAdAction(mockAd)).toEqual(expectedAction);
  });

  it("should create an action to add an ad", () => {
    const mockAds = [
      {
        id: 1,
        title: "some",
        discription: "some",
        dateOfPublication: Date.now().toString(),
        type: 1,
        userId: 1,
      },
      {
        id: 2,
        title: "some",
        discription: "some",
        dateOfPublication: Date.now().toString(),
        type: 2,
        userId: 1
      }
    ];
    const expectedAction = {
      type: types.SET_ADS,
      payload: mockAds,
    };

    expect(actions.setAdsAction(mockAds)).toEqual(expectedAction);
  });
});
