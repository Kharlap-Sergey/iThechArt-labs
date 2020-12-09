import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ShortAd from "../shortAd/ShortAd";
import { getAds } from "./redux/adsPageListActionCreatior";
import "./ads-page-list.scss"
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
    console.log("did mount");
    this.loadPage();
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
        {ads.map((ad) => {
          return (
            <div className="ads-list__element" key={ad.id}>
              <ShortAd
                key={ad.id}
                adId ={ad.id}
                title={ad.title}
                typ={ad.type}
                description={ad.description}
                date={ad.dateOfPublication}
                authorId={ad.authorId}
                shouldAvatarDisplay={!userWasDefinedFlag}
              />
            </div>
          );
        })}
        {this.props.hasPrevious && <button onClick={this.handlePrevious}>Prev</button>}
        {this.props.hasNext && <button onClick={this.handleNext}>Next</button>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { ...state.adsPageList};
};
const mapDispatchToProps = {
  getAds,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdsPageList);
