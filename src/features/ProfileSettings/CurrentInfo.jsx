import React from "react";
import PropTypes from "prop-types";

import "./currentInfo.scss";

const CurrentInfo = ({ user }) => {
  return (
    <section className="current-info">
      <h3 className="current-info__title">Account Details</h3>
      <div className="current-info__items">
        <div className="current-info__item">
          <h5 className="current-info__item-title">Username</h5>
          <p>{user.userName}</p>
        </div>
        <div className="current-info__item">
          <h5 className="current-info__item-title">Email</h5>
          <p>{user.email}</p>
        </div>
        <div className="current-info__item">
          <h5 className="current-info__item-title">Address</h5>
          <p>{user.location ? user.location : "---"}</p>
        </div>
        <div className="current-info__item">
          <h5 className="current-info__item-title">Birthday</h5>
          <p>{user.birthdayDate ? user.birthdayDate : "---"}</p>
        </div>
      </div>
    </section>
  );
};
CurrentInfo.propTypes = {
  user: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default CurrentInfo;
