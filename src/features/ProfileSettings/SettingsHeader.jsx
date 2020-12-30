import React from "react";
import Button from "components/button/Button";
import PropTypes from "prop-types";

import "./settingsHeader.scss";

const SettingsHeader = ({ setWhichForm, whichForm, userImage, user }) => {
  return (
    <nav className="profile-settings-nav">
      <div className="profile-settings-nav__left">
        <Button
          blankNoBorder={true}
          isMarked={whichForm === "account" && true}
          handleClick={() => setWhichForm("account")}
        >
          Change Account Details
        </Button>
        <Button
          blankNoBorder={true}
          isMarked={whichForm === "passwords" && true}
          handleClick={() => setWhichForm("passwords")}
        >
          Change Password
        </Button>
        <Button
          blankNoBorder={true}
          isMarked={whichForm === "email" && true}
          handleClick={() => setWhichForm("email")}
        >
          Change Email
        </Button>
      </div>
      <div className="profile-settings-nav__right">
        <div className="profile-settings-nav__upload-pic">
          <Button blankNoBorder={true}>
            <img
              className="profile-widget__picture"
              src={userImage}
              alt="user profile"
            />
          </Button>
        </div>
      </div>
    </nav>
  );
};

SettingsHeader.propTypes = {
  whichForm: PropTypes.string,
  setWhichForm: PropTypes.func,
  userImage: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default SettingsHeader;
