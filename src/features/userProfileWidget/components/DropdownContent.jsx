import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SettingsIcon } from "../../../assets/icons/settings.svg";
import { ReactComponent as LogOutIcon } from "../../../assets/icons/log-out.svg";

function DropDownContent() {
  return (
    <div className="dropdown">
      <ul className="dropdown__content">
        <li className="dropdown__item">
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

export default DropDownContent;
