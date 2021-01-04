import React, { PureComponent } from "react";
import AdForm from "../shared/components/adForm/AdForm";
import { connect } from "react-redux";
import Loader from "../shared/components/Loader/Loader";
import bgImg from "../shared/imgs/ad-creat.svg";
import "./ad-creation.scss";
import { createNewAd } from "shared/redux/ad/thunkActions";
class AdCreation extends PureComponent {
  submitHandler(state) {
    this.props.createNewAd(state);
  }

  render() {
    return (
      <div className="ad-creation">
        <div className="ad-creation__body">
          {this.props.isLoading ? (
            <Loader />
          ) : (
            <div className="ad-creation__form">
              <AdForm onSubmit={this.submitHandler.bind(this)}></AdForm>
            </div>
          )}
        </div>

        <div className="ad-creation__img-bg-wrapper">
          <img
            className="ad-creation__img-bg"
            src={bgImg}
            alt="hee should be img"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.adForm,
});

const mapDispatchToProps = {
  createNewAd,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdCreation);