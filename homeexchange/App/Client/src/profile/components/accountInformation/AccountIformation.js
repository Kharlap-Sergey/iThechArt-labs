import PropTypes from "prop-types";
import React from "react";
import AccountAvatar from "shared/components/accountAvatar/AccountAvatar";
import "./account-information.scss";

function AccountIformation({
  id,
  nickname,
  email,
  country,
  city,
  children,
}) {
  return (
    <div className="account-info">
      <div className="account-info__avatar">
        <AccountAvatar profileId={id} />
      </div>
      <div className="account-info__information">
        <div className="account-info__nickname">{nickname}</div>
        <div className="account-info__email">{email}</div>
        <div className="account-info__from">
          from {country} {city}
        </div>
      </div>
      <div className="account-info__editor">{children}</div>
    </div>
  );
}

AccountIformation.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default AccountIformation;
