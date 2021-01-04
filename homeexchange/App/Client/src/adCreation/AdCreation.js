import React, { PureComponent } from "react";
import { connect } from "react-redux";
import AdForm from "shared/components/adForm/AdForm";
import Loader from "shared/components/Loader/Loader";
import bgImg from "shared/imgs/ad-creat.svg";
import { createNewAd } from "shared/redux/ad/thunkActions";
import { selectAdFormLoaderStatus } from "shared/redux/loader/selectors";
import "./ad-creation.scss";

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
              <AdForm onSubmit={this.submitHandler.bind(this)} />
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
  isLoading: selectAdFormLoaderStatus(state),
});

const mapDispatchToProps = {
  createNewAd,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdCreation);
