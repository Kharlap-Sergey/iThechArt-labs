import React, { PureComponent } from "react";
import { connect } from "react-redux";
import AdForm from "./../shared/components/adForm/AdForm";
import bgImg from "../shared/imgs/repairing.svg";
import "./ad-editor.scss";
import Loader from "../shared/components/Loader/Loader";
import { getAd, updateAd } from "shared/redux/ad/thunkActions";

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
        <div className="ad-editor__body">
          {this.props.isLoading ? (
            <Loader />
          ) : (
            <div className="ad-editor__form">
              {this.props.ad.id && (
                <AdForm
                  onSubmit={this.submitHandler.bind(this)}
                  initial={this.props.ad}
                ></AdForm>
              )}
            </div>
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
  isLoading: state.loader.adForm,
});

const mapDispatchToProps = {
  getAd,
  updateAd,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdEditor);