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
  const { data, error } = useContext(UserContext);
  const { logout } = useAuthentication();
  const dropdownRef = useRef(null);
  const pictureRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setOpen(false));

  useEffect(() => {
    if (!isObjectEmpty(data)) {
      setImage(data.userImage);
      pictureRef.current.style.visibility = "visible";
    } else {
      pictureRef.current.style.visibility = "hidden";
    }
    if (error !== null) {
      setImage(userIcon);
      pictureRef.current.style.visibility = "visible";
    }
  }, [data, error]);

  return (
    <div className="profile-widget" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} ref={pictureRef}>
        {image && (
          <img
            className="profile-widget__picture"
            src={
              image.startsWith("https://")
                ? image
                : `data:image/jpeg;base64,${data.userImage}`
            }
            alt="user profile"
          />
        )}
        <ArrowDown className="profile-widget__arrow " />
      </button>

      <DropDownContent isOpen={open} logout={logout} />
    </div>
  );
}

export default UserProfileWidget;
