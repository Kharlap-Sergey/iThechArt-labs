import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { deleteAd } from '../../shared/redux/ad/adActionCreator'
class Authorized extends PureComponent {
  removeClickHandler(event){
    this.props.deleteAd(this.props.adId);
  }
  render() {
    return (
      <div className="ad-main__auth">
        {this.props.userId === this.props.authorId ? (
          <>
            <button className="ad-main__btn">edit</button>
            <button className="ad-main__btn" onClick={this.removeClickHandler.bind(this)}>remove</button>
          </>
        ) : (
          <button className="ad-main__btn">reply</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.user });

const mapDispatchToProps = {
  deleteAd
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
