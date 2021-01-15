import React, { useState, useEffect, useRef, useContext } from "react";

import DropDownContent from "./DropdownContent";
import userIcon from "assets/icons/user.svg";
import { ReactComponent as ArrowDown } from "assets/icons/down-with-border.svg";
import { useOnClickOutside } from "utils/useOnClickOutside";
import { isObjectEmpty } from "utils/objects";

import { useAuthentication } from "authentication/useAuthentication";
import { UserContext } from "contexts/UserContext";
import "./userProfileWidget.scss";

function UserProfileWidget() {
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { data, error } = useContext(UserContext);
  const { logout } = useAuthentication();
  const dropdownRef = useRef(null);
  const pictureBtnRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setOpen(false));

  useEffect(() => {
    if (!isObjectEmpty(data)) setImage(data.userImage);
    if (error !== null) setImage(userIcon);
  }, [data, error]);

  useEffect(() => {
    setExpanded(open);
  }, [open]);

  return (
    <div className="profile-widget" ref={dropdownRef}>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        ref={pictureBtnRef}
        aria-expanded={expanded}
        aria-controls="settings-dropdown"
      >
        <span id="settings-label" className="visually-hidden">
          Profile settings.
        </span>
        {image && (
          <img
            className="profile-widget__picture"
            src={
              image.startsWith("https://")
                ? image
                : `data:image/jpeg;base64,${data.userImage}`
            }
            alt=""
          />
        )}
        <ArrowDown className="profile-widget__arrow " aria-hidden="true" />
      </button>

      <DropDownContent
        isOpen={open}
        logout={logout}
        setOpen={setOpen}
        setExpanded={setExpanded}
      />
    </div>
  );
}

export default UserProfileWidget;
