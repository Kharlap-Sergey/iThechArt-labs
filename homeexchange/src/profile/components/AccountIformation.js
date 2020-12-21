import React, { PureComponent } from "react";
import AccountAvatar from "../../shared/components/accountAvatar/AccountAvatar";
import "./account-information.scss"
class AccountIformation extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <div className="account-info">
        <div className="account-info__avatar">
          <AccountAvatar profileId={ this.props.id}/>
        </div>
        <div className="account-info__information">
          <div className="account-info__nickname">{this.props.nickname}</div>
          <div className="account-info__email">{this.props.email}</div>
          <div className="account-info__from">from {this.props.country} {this.props.city}</div>
        </div>
        <div className="account-info__editor">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AccountIformation;
