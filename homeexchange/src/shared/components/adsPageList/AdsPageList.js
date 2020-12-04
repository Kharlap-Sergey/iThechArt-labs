import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ShortAd from "../shortAd/ShortAd";
import { getAds } from "./redux/adsPageListActionCreatior";

class AdsPageList extends PureComponent {
  componentDidMount() {
    this.props.getAds(8);
  }
  render() {
    console.log(this.props);
    const ads = this.props.ads;
    return (
      <div>
        {ads.map((ad) => {
          return (
            <ShortAd
              key={ad.id}
              title={ad.title}
              typ={ad.type}
              description={ad.description}
              date={ad.dateOfPublication}
            />
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
