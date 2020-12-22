import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { clearAdsPageAction, getAds } from "./redux/adsPageListActionCreatior";
import "./ads-page-list.scss";
import Page from "./components/Page";
import Loader from "../Loader/Loader";
import Filter from "./components/Filter";
class AdsPageList extends PureComponent {
  constructor(props) {
    super(props);

    this.initialState = { currentPage: 1, type: 0 };
    this.state = this.initialState;
  }

  loadPage() {
    this.props.getAds(
      this.state.currentPage,
      this.state.type,
      "",
      this.props.userId
    );
  }

  handleNext = (event) => {
    event.preventDefault();
    this.setState((state) => {
      return { ...state, currentPage: state.currentPage + 1 };
    });
    console.log(this.state);
  };
  handlePrevious = (event) => {
    event.preventDefault();
    this.setState((state) => {
      return { ...state, currentPage: state.currentPage - 1 };
    });
  };
  componentDidMount() {
    this.loadPage();
  }
  componentWillUnmount() {
    this.props.clearAdsPageAction();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("did update&&");
    if (prevState.currentPage !== this.state.currentPage) {
      console.log("should be updated");
      this.loadPage();
    }
  }

  handleFilterSwitch(e) {
    console.log("e", e);
    const selectedId = +e.target.value;

    this.setState(
      (state) => {
        return { ...this.initialState, type: selectedId };
      },
      () => {
        this.loadPage();
      }
    );
  }

  render() {
    console.log("render");
    console.log(this.props);
    const ads = this.props.ads;
    const userWasDefinedFlag = Boolean(this.props.userId);
    return (
      <div className="ads-list">
        {this.props.isLoading ? (
          <Loader />
        ) : (
          <>
            <div>
              <Filter
                type={this.state.type}
                onChange={(e) => {
                  this.handleFilterSwitch(e);
                }}
              />
            </div>
            <Page
              ads={ads}
              userWasDefinedFlag={userWasDefinedFlag}
              prevBtn={this.props.hasPrevious ? this.handlePrevious : null}
              nextBtn={this.props.hasNext ? this.handleNext : null}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { ...state.adsPageList, isLoading: state.loader.pageList };
};
const mapDispatchToProps = {
  getAds,
  clearAdsPageAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdsPageList);
