import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

import { ReactComponent as SettingsIcon } from "../../../assets/icons/settings.svg";
import { ReactComponent as LogOutIcon } from "../../../assets/icons/log-out.svg";

function DropDownContent({ isOpen }) {
  return (
    <div
      className={classNames("dropdown", {
        "is-active": isOpen,
      })}
    >
      <ul className="dropdown__content">
        <li className="dropdown__item dropdown__item--first">
          <SettingsIcon className="dropdown__icon" />
          <span>Settings</span>
        </li>

        <Link to="/login">
          <li className="dropdown__item">
            <LogOutIcon className="dropdown__icon" />
            <span>Log out</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

DropDownContent.propTypes = {
  isOpen: PropTypes.bool,
};

export default DropDownContent;
