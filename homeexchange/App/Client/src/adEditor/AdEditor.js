import PropTypes from 'prop-types';
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import AdForm from "shared/components/adForm/AdForm";
import bgImg from "shared/imgs/repairing.svg";
import Loader from "shared/components/Loader/Loader";
import { getAd, updateAd } from "shared/redux/ad/thunkActions";
import { selectAd } from 'shared/redux/ad/selectors';
import { selectAdFormLoaderStatus } from 'shared/redux/loader/selectors';
import "./ad-editor.scss";

class AdEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this)
  }
  static propTypes = {
    ad: PropTypes.object.isRequired,
    getAd: PropTypes.func.isRequired,
    updateAd: PropTypes.func.isRequired,
  }
  submitHandler(state) {
    this.props.updateAd(state);
  }
  componentDidMount() {
    this.props.getAd(this.props.match.params.id );
  }

  render() {
    const {ad} = this.props;
    return (
      <div className="ad-editor">
        <div className="ad-editor__body">
          {this.props.isLoading ? (
            <Loader />
          ) : (
            <div className="ad-editor__form">
                <AdForm
                  onSubmit={this.submitHandler}
                  initial={ad}
                />
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
  ad: selectAd(state),
  isLoading: selectAdFormLoaderStatus(state),
});

const mapDispatchToProps = {
  getAd,
  updateAd,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdEditor);
