import {
  clearAdsAction,
  setAdAction,
  setAdsAction,
} from "shared/redux/ad/actions";
import { adReducer } from "shared/redux/ad/reducer";

describe("test ad reducer", () => {
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
    ad: mockAd,
    adsPage: {
      hasNext: false,
      hasPrevious: false,
      ads: [],
    },
  };

  it("should return the initial state", () => {
    expect(adReducer(undefined, {})).toEqual({
      adsPage: { ads: [], hasNext: false, hasPrevious: false },
      ad: {},
    });
  });

  it("should handle SET_AD", () => {
    expect(adReducer(initialStore, setAdAction(mockAd))).toEqual({
      adsPage: initialStore.adsPage,
      ad: mockAd,
    });
  });

  it("should handle SET_ADS", () => {
    expect(
      adReducer(
        initialStore,
        setAdsAction({
          hasNext: true,
          hasPrevious: true,
          ads: mockAds,
        })
      )
    ).toEqual({
      adsPage: {
        hasNext: true,
        hasPrevious: true,
        ads: mockAds,
      },
      ad: mockAd,
    });
  });

  it("should handle CLEARE", () => {
    expect(adReducer(initialStore, clearAdsAction())).toEqual({
      adsPage: { ads: [], hasNext: false, hasPrevious: false },
      ad: {},
    });
  });
});
