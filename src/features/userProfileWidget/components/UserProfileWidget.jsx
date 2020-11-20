import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsonserver from "../../../apis/jsonserver";

import DropDownContent from "./DropdownContent";
import { ReactComponent as ArrowDown } from "../../../assets/icons/down-with-border.svg";
import userIcon from "../../../assets/icons/user.svg";
import "./userProfileWidget.scss";

function UserProfileWidget() {
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState(userIcon);
  const [open, setOpen] = useState(false);

  const drop = useRef(null);
  const handleClick = () => setOpen(!open);
  const handleOutsideClick = (event) => {
    if (drop.current && !drop.current.contains(event.target)) setOpen(false);
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setMounted(true);

    document.addEventListener("click", handleOutsideClick);
    const getImage = async () => {
      try {
        const { data } = await jsonserver.get("/userData", {
          cancelToken: source.token,
        });
        setImage(data.userImage);
      } catch (err) {
        if (err) setImage(userIcon);
      }
    };

    if (mounted) getImage();
    return () => {
      source.cancel();
      setMounted(false);
    };
  }, [mounted, image]);

  return (
    <div className="profile-widget" ref={drop}>
      <button onClick={handleClick} className="profile-widget__button">
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
