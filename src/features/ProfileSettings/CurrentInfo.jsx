import React from "react";
import PropTypes from "prop-types";

import "./currentInfo.scss";

const CurrentInfo = ({ user }) => {
  return (
    <section className="current-info">
      <h2 className="current-info__title">Account Details</h2>
      <div className="current-info__items">
        <div className="current-info__item">
          <span className="current-info__item-title">Username:</span>
          <span className="current-info__item-info">{user.userName}</span>
        </div>
        <div className="current-info__item">
          <span className="current-info__item-title">Email:</span>
          <span className="current-info__item-info">{user.email}</span>
        </div>
        <div className="current-info__item">
          <span className="current-info__item-title">Address:</span>
          <span className="current-info__item-info">
            {user.location ? user.location : "---"}
          </span>
        </div>
        <div className="current-info__item">
          <span className="current-info__item-title">Birthday:</span>
          <span className="current-info__item-info">
            {user.birthdayDate ? user.birthdayDate : "---"}
          </span>
        </div>
      </div>
    </section>
  );
};
CurrentInfo.propTypes = {
  user: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default CurrentInfo;
