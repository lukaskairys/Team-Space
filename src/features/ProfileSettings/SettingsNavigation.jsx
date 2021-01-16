import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import ImageUpload from "features/imageUpload/components/ImageUpload";

import "./settingsNavigation.scss";

const SettingsNavigation = ({
  setWhichForm,
  whichForm,
  setValues,
  setErrors,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (
      location.hash &&
      (location.hash === "#change-details" ||
        location.hash === "#change-password" ||
        location.hash === "#change-email")
    ) {
      setWhichForm(location.hash.substring(1));
      setValues({});
      setErrors({});
    }
  }, [location, setWhichForm, setErrors, setValues]);

  return (
    <nav className="profile-settings-nav" aria-labelledby="settings-title">
      <ul className="profile-settings-nav__items">
        <li
          className={classNames("profile-settings-nav__item", {
            "active-setting-link": whichForm === "change-details",
          })}
        >
          <a
            href="#change-details"
            onClick={() => setWhichForm("change-details")}
          >
            Change Details
          </a>
        </li>
        <li
          className={classNames("profile-settings-nav__item", {
            "active-setting-link": whichForm === "change-password",
          })}
        >
          <a
            href="#change-password"
            onClick={() => setWhichForm("change-password")}
          >
            Change Password
          </a>
        </li>
        <li
          className={classNames("profile-settings-nav__item", {
            "active-setting-link": whichForm === "change-email",
          })}
        >
          <a href="#change-email" onClick={() => setWhichForm("change-email")}>
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
  setValues: PropTypes.func,
  setErrors: PropTypes.func,
};

export default SettingsNavigation;
