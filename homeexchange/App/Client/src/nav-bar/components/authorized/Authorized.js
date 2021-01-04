import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from "react";
import Avatar from "shared/components/avatar/Avatar";
import DropdownMenu from "shared/components/dropdownMenu/DropdownMenu";
import LogoutBtn from "shared/components/logoutBtn/LogoutBtn";
import PaintedLink from "shared/components/paintedLink/PaintedLink";
import "./authorized.scss";
import NotificationsList from "shared/components/notificationsList/NotificationsList";
import { path } from "shared/utils/path";
import DropdownItem from "../dropdownItem/DropdownItem";

class Authorized extends PureComponent {
  constructor(props) {
    super(props);

    this.activeNotif =
      "https://cdnjs.loli.net/ajax/libs/material-design-icons/3.0.1/social/drawable-xxxhdpi/ic_notifications_active_white_18dp.png";
    this.notif =
      "https://cdnjs.loli.net/ajax/libs/material-design-icons/3.0.1/social/drawable-xxxhdpi/ic_notifications_none_white_18dp.png";
    this.state = {
      showActionMenu: false,
      showNotificationsMenu: false,
      imgNotificationSrc: this.notif,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleNotificClick = this.handleNotificClick.bind(this);
    this.notify = this.notify.bind(this);
    this.deNotify = this.deNotify.bind(this);
    this.notificationListRef = React.createRef();
  }
  static propTypes = {
    userId: PropTypes.number.isRequired,
  }
  notify() {
    this.setState({ imgNotificationSrc: this.activeNotif });
  }
  deNotify() {
    this.setState({ imgNotificationSrc: this.notif });
  }
  handleClick(event) {
    event.preventDefault();
    const notificationsList = this.notificationListRef.current;
    this.setState({ showActionMenu: !this.state.showActionMenu });
    notificationsList.classList.add("display-none");
  }

  handleNotificClick(event) {
    event.preventDefault();
    const notificationsList = this.notificationListRef.current;
    notificationsList.classList.toggle("display-none");
    this.setState({ showActionMenu: false });
  }

  render() {
    return (
      <Fragment key="authorized-items">
        <li className="menu__item " key="authorizedProfileNotig">
          <div className="authorized-container">
            <DropdownItem
              icon={
                <div className="avatar--mini">
                  <div className="avatar">
                    <img
                      src={this.state.imgNotificationSrc}
                      alt={"notif"}
                      className="avatar__img"
                    />
                  </div>
                </div>
              }
              dropdownMenu={
                <DropdownMenu w="250px">
                  <NotificationsList
                    notify={this.notify}
                    deNotify={this.deNotify}
                  />
                </DropdownMenu>
              }
            />
          </div>
        </li>
        <li className="menu__item " key="authorizedProfileActions">
          <div className="authorized-container">
            <DropdownItem
              icon={
                <div className="avatar--mini">
                  <Avatar profileId={this.props.userId} />
                </div>
              }
              dropdownMenu={
                <DropdownMenu w="150px">
                  <ul className="profile-actions">
                    <li className="profile-actions__item">
                      <PaintedLink
                        to={path.profile.to(this.props.userId)}
                        value="profile"
                      />
                    </li>
                    <li className="profile-actions__item">
                      <PaintedLink to={path.ad.create()} value="create ad" />
                    </li>
                    <li className="profile-actions__item">
                      <PaintedLink to={path.chat("0")} value="my chats" />
                    </li>
                  </ul>

                  <div className="logout-part-of-nav">
                    <LogoutBtn/>
                  </div>
                </DropdownMenu>
              }
            />
          </div>
        </li>
      </Fragment>
    );
  }
}

export default Authorized;
