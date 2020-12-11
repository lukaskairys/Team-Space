import React, { useState, useEffect, useRef, useContext } from "react";

import DropDownContent from "./DropdownContent";
import userIcon from "../../../assets/icons/user.svg";
import { ReactComponent as ArrowDown } from "../../../assets/icons/down-with-border.svg";
import { useRequest } from "../../../apis/useRequest";
import { useOnClickOutside } from "../../../utils/useOnClickOutside";
import { isObjectEmpty } from "../../../utils/objects";

import { UserContext } from "contexts/UserContext";
import "./userProfileWidget.scss";

function UserProfileWidget() {
  const [image, setImage] = useState(userIcon);
  const [open, setOpen] = useState(false);

  const { id, logout } = useContext(UserContext);
  const userFromLocal = JSON.parse(localStorage.getItem("user"));
  const { data, error } = useRequest(`/users/${id ? id : userFromLocal.id}`);

  const dropRef = useRef(null);

  useOnClickOutside(dropRef, () => setOpen(false));

  useEffect(() => {
    if (!isObjectEmpty(data)) setImage(data.userImage);
    if (error !== null) setImage(userIcon);
  }, [data, error]);

  return (
    <div className="profile-widget" ref={dropRef}>
      <button onClick={() => setOpen(!open)}>
        <img
          className="profile-widget__picture"
          src={image}
          alt="user profile"
        />
        <ArrowDown className="profile-widget__arrow " />
      </button>

      <DropDownContent isOpen={open} logout={logout} />
    </div>
  );
}

export default UserProfileWidget;
