import * as selectors from 'shared/redux/ad/selectors';

describe("test ad selectors", () => {

  let mockState
  const mockAd = {
    id: 1,
    title: "some",
    discription: "some",
    dateOfPublication: Date.now().toString(),
    type: 1,
    userId: 1,
  };
  beforeEach(()=>{
    mockState = {
      ads:{
        ad: mockAd,
        adsPage: {
          hasNext: false,
          hasPrevious: false,
          ads:[]
        }
      }
    }
  })

  it("test selection ad", ()=>{
    const expectedAd = mockState.ads.ad;
    expect(selectors.selectAd(mockState)).toBe(expectedAd);
  })

  it("test selection adsPage", ()=>{
    const expectedAdsPage = mockState.ads.adsPage;
    expect(selectors.selectAdsPage(mockState)).toBe(expectedAdsPage);
  })
});
