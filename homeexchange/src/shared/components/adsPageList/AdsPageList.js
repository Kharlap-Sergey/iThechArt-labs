import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { clearAdsPageAction, getAds } from "./redux/adsPageListActionCreatior";
import "./ads-page-list.scss"
import Page from "./components/Page";
import Loader from "../Loader/Loader";
class AdsPageList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { currentPage: 1 }
  }

  loadPage() {
    this.props.getAds(this.state.currentPage, this.props.userId);
  }

  handleNext = (event) => {
    event.preventDefault();
    this.setState((state) => {
      return { currentPage: state.currentPage + 1 }
    });
    console.log(this.state);
  }
  handlePrevious = (event) => {
    event.preventDefault();
    this.setState((state) => {
      return { currentPage: state.currentPage - 1 }
    });

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
      console.log("should be updated")
      this.loadPage();
    }
  }
  render() {
    console.log("render");
    console.log(this.props);
    const ads = this.props.ads;
    const userWasDefinedFlag = Boolean(this.props.userId)
    return (
      <div>
        {this.props.isLoading
          ? <Loader />
          : <Page ads={ads}
            userWasDefinedFlag={userWasDefinedFlag}
            prevBtn={this.props.hasPrevious && this.handlePrevious}
            nextBtn={this.props.hasNext && this.handleNext}
          />}
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
