import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import Ad from "shared/components/ad/Ad";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { redirectToAction } from "shared/redux/redirect/actions";
import { path } from "shared/utils/path";
import { deleteAd } from 'shared/redux/ad/thunkActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialStore = {
  ads: {
    ad: {},
    adsPage: {},
  },
  user: {
    date: {},
  },
  profileImg: {
    imgs: {},
  },
};
const mockAd = {
  id: 1,
  title: "some",
  discription: "some",
  dateOfPublication: 1610126126734,
  type: 1,
  authorId: 1,
};

describe("test ad component", () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore(initialStore);
    store.dispatch = jest.fn();
    component = renderer.create(
      <Provider store={store}>
        <Ad adId={1} handleLessClick={() => {}} />
      </Provider>
    );
  });

  it("should render the component with given state", () => {
    expect(component.toJSON()).toMatchSnapshot();

    const state = {
      ads: {
        ad: mockAd,
        adsPage: {},
      },
      user: {
        date: {},
      },
      profileImg: {
        imgs: {},
      },
    };
    store = mockStore(state);
    renderer.act(() => {
      component.update(
        <Provider store={store}>
          <Ad adId={1} handleLessClick={() => {}} />
        </Provider>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();

    state.user.date.userId = mockAd.authorId;
    store = mockStore(state);
    renderer.act(() => {
      component.update(
        <Provider store={store}>
          <Ad adId={1} handleLessClick={() => {}} />
        </Provider>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();

    state.user.date.userId = mockAd.authorId - 1;
    store = mockStore(state);
    renderer.act(() => {
      component.update(
        <Provider store={store}>
          <Ad adId={1} handleLessClick={() => {}} />
        </Provider>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should dixpatch an action on remove btn click", () => {
    const state = {
      ads: {
        ad: mockAd,
        adsPage: {},
      },
      user: {
        date: {},
      },
      profileImg: {
        imgs: {},
      },
    };
    state.user.date.userId = mockAd.authorId;
    store = mockStore(state);
    store.dispatch = jest.fn();
    renderer.act(() => {
      component.update(
        <Provider store={store}>
          <Ad adId={mockAd.id} handleLessClick={() => {}} />
        </Provider>
      );
    });

    expect(component).toMatchSnapshot();
    renderer.act(() => {
      const elem = component.root.findByProps({ id: "ad-action__edit-btn" });
      expect(elem.children).toEqual(["edit"]);
      elem.props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(2, redirectToAction(path.ad.edit(mockAd.id)));
  });

  it("should dixpatch an action on remove btn remove", () => {
    const state = {
      ads: {
        ad: mockAd,
        adsPage: {},
      },
      user: {
        date: {},
      },
      profileImg: {
        imgs: {},
      },
    };
    state.user.date.userId = mockAd.authorId;
    store = mockStore(state);
    store.dispatch = jest.fn();
    renderer.act(() => {
      component.update(
        <Provider store={store}>
          <Ad adId={mockAd.id} handleLessClick={() => {}} />
        </Provider>
      );
    });

    expect(component).toMatchSnapshot();
    renderer.act(() => {
      const elem = component.root.findByProps({ id: "ad-action__remove-btn" });
      expect(elem.children).toEqual(["remove"]);
      elem.props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
