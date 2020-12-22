import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { clearAdsPageAction, getAds } from "./redux/adsPageListActionCreatior";
import "./ads-page-list.scss";
import Page from "./components/Page";
import Loader from "../Loader/Loader";
import Filter from "./components/Filter";
import SearchBar from './../searchBar/SearchBar';
class AdsPageList extends PureComponent {
  constructor(props) {
    super(props);

    this.initialState = { currentPage: 1, type: 0, searchVal:"", isOpen: false};
    this.state = this.initialState;
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
  }
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

  loadPage() {
    this.props.getAds(
      this.state.currentPage,
      this.state.type,
      this.state.searchVal,
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
  
  handleFilterSwitch(e) {
    console.log("e", e);
    const selectedId = +e.target.value;

    this.setState(
      (state) => {
        return { ...state, type: selectedId, currentPage: 1 };
      },
      () => {
        this.loadPage();
      }
    );
  }
  handleSearchChange(e) {
    console.log("e", e);
    this.setState(
      (state) => {
        return { ...state, searchVal: e.target.value, currentPage: 1 };
      },
      () => {
        this.loadPage();
      }
    );
  }
  handleSearchClick(e) {
    console.log("e", e);
    this.setState(
      (state) => {
        return { ...state, isOpen: !state.isOpen, searchVal: ""};
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
              <div className="ads-list__search">
              <SearchBar onChange={this.handleSearchChange} val={this.state.searchVal}
              onSearchClick={this.handleSearchClick} isOpen={this.state.isOpen}/>
              </div>
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
