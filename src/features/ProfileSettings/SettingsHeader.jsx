import React from "react";
import Button from "components/button/Button";
import PropTypes from "prop-types";

import "./settingsHeader.scss";

const SettingsHeader = ({ setWhichForm, whichForm, userImage }) => {
  return (
    <nav className="profile-settings-nav">
      <div className="profile-settings-nav__left">
        <Button
          blankNoBorder={true}
          isMarked={whichForm === "account" && true}
          handleClick={() => setWhichForm("account")}
        >
          Account Details
        </Button>
        <Button
          blankNoBorder={true}
          isMarked={whichForm === "passwords" && true}
          handleClick={() => setWhichForm("passwords")}
        >
          Change password
        </Button>
        <Button
          blankNoBorder={true}
          isMarked={whichForm === "email" && true}
          handleClick={() => setWhichForm("email")}
        >
          Change email
        </Button>
      </div>
      <div className="profile-settings-nav__right">
        <Button blankNoBorder={true}>
          <img
            className="profile-widget__picture"
            src={userImage}
            alt="user profile"
          />
          <span className="profile-widget__photo-text">Upload a photo</span>
        </Button>
      </div>
    </nav>
  );
};

SettingsHeader.propTypes = {
  whichForm: PropTypes.string,
  setWhichForm: PropTypes.func,
  userImage: PropTypes.string,
};

export default SettingsHeader;
