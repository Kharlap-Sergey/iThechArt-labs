import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import AdForm from "shared/components/adForm/AdForm";
import Loader from "shared/components/Loader/Loader";
import bgImg from "shared/imgs/ad-creat.svg";
import { createNewAd } from "shared/redux/ad/thunkActions";
import { selectAdFormLoaderStatus } from "shared/redux/loader/selectors";
import "./ad-creator.scss";

class AdCreator extends PureComponent {
  submitHandler(state) {
    this.props.createNewAd(state);
  }
  static propTypes = {
    isLoading: PropTypes.bool,
    createNewAd: PropTypes.func,
  }

  render() {
    return (
      <div className="ad-creator">
        <div className="ad-creator__body">
          {this.props.isLoading ? (
            <Loader />
          ) : (
            <div className="ad-creator__form">
              <AdForm onSubmit={this.submitHandler.bind(this)} />
            </div>
          )}
        </div>

        <div className="ad-creator__img-bg-wrapper">
          <img
            className="ad-creator__img-bg"
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

export default connect(mapStateToProps, mapDispatchToProps)(AdCreator);
