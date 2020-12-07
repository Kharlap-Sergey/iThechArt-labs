import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Authorized extends PureComponent {
  render() {
    return (
      <div className="ad-main__auth">
        {this.props.userId === this.props.authorId ? (
          <>
            <button className="ad-main__btn">edit</button>
            <button className="ad-main__btn">remove</button>
          </>
        ) : (
          <button className="ad-main__btn">reply</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
