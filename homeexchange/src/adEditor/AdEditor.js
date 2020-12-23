import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getAd } from "./../shared/redux/ad/adActionCreator";
import AdForm from "./../shared/components/adForm/AdForm";
import { updateAd } from "./redux/update";
import bgImg from "../shared/imgs/repairing.svg";
import "./ad-editor.scss";
class AdEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { adId: this.props.match.params.id };
  }
  submitHandler(state) {
    this.props.updateAd(state);
  }
  componentDidMount() {
    this.props.getAd(this.state.adId);
  }

  render() {
    return (
      <div className="ad-editor">
        <div className="ad-editor__form">
          {this.props.ad.id && (
            <AdForm
              onSubmit={this.submitHandler.bind(this)}
              initial={this.props.ad}
            ></AdForm>
          )}
        </div>
        <div className="ad-editor__img-bg-wrapper">
          <img
            className="ad-editor__img-bg"
            src={bgImg}
            alt="hee should be img"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ad: state.ads.ad,
});

const mapDispatchToProps = {
  getAd,
  updateAd,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdEditor);
