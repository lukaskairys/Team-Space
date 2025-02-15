import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ImageUpload from "features/ImageUpload/components/ImageUpload";

import "./settingsNavigation.scss";

const SettingsNavigation = ({ setWhichForm, whichForm }) => {
  return (
    <nav className="profile-settings-nav" aria-labelledby="settings-title">
      <ul className="profile-settings-nav__items">
        <li className="profile-settings-nav__item">
          <a
            className={classNames("profile-settings-nav__link", {
              "active-setting-link": whichForm === "change-details",
            })}
            href="#change-details"
            onClick={() => setWhichForm("change-details")}
          >
            Change Details
          </a>
        </li>
        <li className="profile-settings-nav__item">
          <a
            className={classNames("profile-settings-nav__link", {
              "active-setting-link": whichForm === "change-password",
            })}
            href="#change-password"
            onClick={() => setWhichForm("change-password")}
          >
            Change Password
          </a>
        </li>
        <li className="profile-settings-nav__item">
          <a
            className={classNames("profile-settings-nav__link", {
              "active-setting-link": whichForm === "change-email",
            })}
            href="#change-email"
            onClick={() => setWhichForm("change-email")}
          >
            Change Email
          </a>
        </li>
      </ul>
      <div className="profile-settings-nav__right">
        <ImageUpload />
      </div>
    </nav>
  );
};

SettingsNavigation.propTypes = {
  whichForm: PropTypes.string,
  setWhichForm: PropTypes.func,
};

export default SettingsNavigation;
