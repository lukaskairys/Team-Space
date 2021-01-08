import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import FocusLock from "react-focus-lock";

import { ReactComponent as SettingsIcon } from "../../../assets/icons/settings.svg";
import { ReactComponent as LogOutIcon } from "../../../assets/icons/log-out.svg";

function DropDownContent({ isOpen, setOpen, logout }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, [setOpen]);

  return (
    <div
      className={classNames("dropdown", {
        "is-active": isOpen,
      })}
      id="settings-dropdown"
    >
      <ul className="dropdown__content" aria-labelledby="settings-label">
        <FocusLock>
          <li className="dropdown__item dropdown__item--first">
            <Link
              to="/settings"
              className="dropdown__link"
              onClick={() => setOpen(false)}
            >
              <SettingsIcon className="dropdown__icon" />
              <span>Settings</span>
            </Link>
          </li>
          <li className="dropdown__item">
            <Link to="/login" onClick={logout} className="dropdown__link">
              <LogOutIcon className="dropdown__icon" />
              <span>Log out</span>
            </Link>
          </li>
        </FocusLock>
      </ul>
    </div>
  );
}

DropDownContent.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  logout: PropTypes.func,
};

export default DropDownContent;
