import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { clearAdsAction } from "shared/redux/ad/actions";
import { getAds } from "shared/redux/ad/thunkActions";
import "./ads-page-list.scss";
import Page from "./Page";
import Loader from "shared/components/Loader/Loader";
import Filter from "./Filter";
import SearchBar from "shared/components/searchBar/SearchBar";
import { selectAdsPage } from "shared/redux/ad/selectors";
import { selectAdLoaderStatus } from "shared/redux/loader/selectors";

class AdsPageList extends PureComponent {
  constructor(props) {
    super(props);
    
    this.initialState = {
      currentPage: 1,
      type: { 1: false, 2: false },
      searchVal: "",
      isOpen: false,
    };
    this.state = this.initialState;
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.searchHandler = null;
  }
  componentDidMount() {
    this.loadPage();
  }
  componentWillUnmount() {
    this.props.clearAdsAction();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevProps.userId !== this.props.userId
    ) {
      this.loadPage();
    }
  }

  loadPage() {
    const types = [];
    for(let e in this.state.type){
      if(this.state.type[e]) types.push(+e);
    }
    this.props.getAds(
      this.state.currentPage,
      types,
      this.state.searchVal,
      this.props.userId
    );
  }
  handleNext = (event) => {
    event.preventDefault();
    this.setState((state) => {
      return { ...state, currentPage: state.currentPage + 1 };
    });
  };
  handlePrevious = (event) => {
    event.preventDefault();
    this.setState((state) => {
      return { ...state, currentPage: state.currentPage - 1 };
    });
  };

  handleFilterSwitch(e) {
    e.preventDefault();
    const selectedId = +e.target.value;

    this.setState(
      (state) => {
        return {
          ...state,
          type: { ...state.type, [selectedId]: !state.type[selectedId] },
          currentPage: 1,
        };
      },
      () => {
        this.loadPage();
      }
    );
  }
  handleSearchChange(e) {
    this.setState(
      (state) => {
        return { ...state, searchVal: e.target.value, currentPage: 1 };
      },
      () => {
        clearTimeout(this.searchHandler);
        this.searchHandler = setTimeout(() => {
          this.loadPage();
        }, 1000);
      }
    );
  }
  handleSearchClick(e) {
    if (this.state.searchVal.length > 0) {
      this.setState(
        (state) => {
          return { ...state, isOpen: !state.isOpen, searchVal: "" };
        },
        () => {
          if (!this.state.isOpen) this.loadPage();
        }
      );
    } else {
      this.setState((state) => {
        return { ...state, isOpen: !state.isOpen };
      });
    }
  }
  render() {
    const { ads, hasNext, hasPrevious } = this.props.adsPage;
    const userWasDefinedFlag = Boolean(this.props.userId);
    return (
      <div className="ads-list">
        {this.props.isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="ads-list__options-row">
              <div className="ads-list__search">
                <SearchBar
                  onChange={this.handleSearchChange}
                  val={this.state.searchVal}
                  onSearchClick={this.handleSearchClick}
                  isOpen={this.state.isOpen}
                />
              </div>
              <div className="ads-list__filter">
                <Filter
                  type={this.state.type}
                  onChange={(e) => {
                    this.handleFilterSwitch(e);
                  }}
                />
              </div>
            </div>
            <Page
              ads={ads}
              userWasDefinedFlag={userWasDefinedFlag}
              prevBtn={hasPrevious ? this.handlePrevious : null}
              nextBtn={hasNext ? this.handleNext : null}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  adsPage: selectAdsPage(state),
  isLoading: selectAdLoaderStatus(state),
});
const mapDispatchToProps = {
  getAds,
  clearAdsAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdsPageList);
