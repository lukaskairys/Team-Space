import React, { useState, useEffect, useRef } from "react";

import DropDownContent from "./DropdownContent";
import userIcon from "../../../assets/icons/user.svg";
import { useRequest } from "../../../apis/useRequest";
import { ReactComponent as ArrowDown } from "../../../assets/icons/down-with-border.svg";
import { isObjectEmpty } from "../../../utils/objects";
import "./userProfileWidget.scss";

function UserProfileWidget() {
  const [image, setImage] = useState(userIcon);
  const [open, setOpen] = useState(false);
  const drop = useRef(null);

  const { data, error } = useRequest("/userData");
  const handleClick = () => setOpen(!open);
  const handleOutsideClick = (event) => {
    if (drop.current && !drop.current.contains(event.target)) setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    if (!isObjectEmpty(data)) setImage(data.userImage);
    if (error !== null) setImage(userIcon);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [data, error]);

  return (
    <div className="profile-widget" ref={drop}>
      <button onClick={handleClick}>
        <img
          className="profile-widget__picture"
          src={image}
          alt="user profile"
        />
      </button>
      <ArrowDown className="profile-widget__arrow " />
      <DropDownContent isOpen={open} />
    </div>
  );
}

export default UserProfileWidget;
