import React, { Fragment, PureComponent } from "react";
import Avatar from "../../shared/components/avatar/Avatar";
import DropdownCaret from "../../shared/components/dropdownCaret/DropdownCaret";
import DropdownMenu from "../../shared/components/dropdownMenu/DropdownMenu";
import LogoutBtn from "../../shared/components/logoutBtn/LogoutBtn";
import PaintedLink from "../../shared/components/paintedLink/PaintedLink";
import "./authorized.scss";
import Notifications from "./../../notifications/Notifications";

class Authorized extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { showActionMenu: false, showNotificationsMenu: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleNotificClick = this.handleNotificClick.bind(this);
    this.handleDropdownMenuClick = this.handleDropdownMenuClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    console.log("clicked");
    this.setState({ showActionMenu: !this.state.showActionMenu });
  }

  handleNotificClick(event) {
    event.preventDefault();
    console.log("clicked");
    this.setState({ showNotificationsMenu: !this.state.showNotificationsMenu });
  }
  handleDropdownMenuClick(event) {
    event.preventDefault();
    console.log("fragemtn click");
    this.setState({ showActionMenu: false, showNotificationsMenu: false });
  }
  render() {
    console.log(this.props.userId);
    const imgNotificationSrc =
      "https://cdnjs.loli.net/ajax/libs/material-design-icons/3.0.1/social/drawable-xxxhdpi/ic_notifications_active_black_18dp.png";
    const imgAvatarSrc =
      this.props.imgSrc ??
      "data:image/jpeg;base64,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";
    return (
      <Fragment>
        <li className="menu__item " key="authorizedProfileNotig">
          <div className="authorized-container">
            <div className="profile" onClick={this.handleNotificClick}>
              <div className="avatar--mini">
                <Avatar source={imgNotificationSrc} />
              </div>
            </div>
            {this.state.showNotificationsMenu && (
              <DropdownMenu onClick={this.handleDropdownMenuClick}>
                {console.log("should draw")}
                <PaintedLink
                  to={"/profile/" + this.props.userId}
                  value="profile"
                />
                <PaintedLink to={"/ad/create"} value="create ad" />
                <div className="logout-part-of-nav">
                  <LogoutBtn></LogoutBtn>
                </div>
              </DropdownMenu>
            )}
          </div>
        </li>
        <li className="menu__item" key="authorizedProfile">
          <div className="authorized-container">
            <div className="profile" onClick={this.handleClick}>
              <div className="avatar--mini">
                <Avatar source={imgAvatarSrc} />
              </div>
              {/* <DropdownCaret /> */}
            </div>
            {this.state.showActionMenu && (
              <DropdownMenu onClick={this.handleDropdownMenuClick}>
                {console.log("should draw")}
                <PaintedLink
                  to={"/profile/" + this.props.userId}
                  value="profile"
                />
                <PaintedLink to={"/ad/create"} value="create ad" />
                <div className="logout-part-of-nav">
                  <LogoutBtn></LogoutBtn>
                </div>
              </DropdownMenu>
            )}
          </div>
        </li>
      </Fragment>
    );
  }
}

export default Authorized;
