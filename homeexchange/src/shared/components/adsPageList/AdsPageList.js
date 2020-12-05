import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ShortAd from "../shortAd/ShortAd";
import { getAds } from "./redux/adsPageListActionCreatior";
import "./ads-page-list.scss"
class AdsPageList extends PureComponent {
  componentDidMount() {
    this.props.getAds(1);
  }
  render() {
    console.log(this.props);
    const ads = this.props.ads;
    return (
      <div>
        {ads.map((ad) => {
          return (
            <div className="ads-list__element">
              <ShortAd
              key={ad.id}
              title={ad.title}
              typ={ad.type}
              description={ad.description}
              date={ad.dateOfPublication}
            />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { ...state.adsPageList };
};
const mapDispatchToProps = {
  getAds,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdsPageList);
