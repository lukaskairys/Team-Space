import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Button from "../../../components/button/Button";
import { ReactComponent as ArrowDown } from "../../../assets/icons/down-with-border.svg";

import jsonserver from "../../../apis/jsonserver";
import "./userProfileWidget.scss";
import DropDownContent from "./DropdownContent";

function UserProfileWidget() {
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState("");
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

    document.addEventListener("mousedown", handleOutsideClick);
    const getImage = async () => {
      try {
        const { data } = await jsonserver.get("/userData", {
          cancelToken: source.token,
        });
        setImage(data.userImage);
      } catch (err) {
        if (err) setImage("error");
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
      <Button dropdown={"true"} handleClick={handleClick}>
        <img className="dropdown-btn__picture" src={image} alt="user profile" />
      </Button>
      <ArrowDown className="profile-widget__arrow " />
      {open && <DropDownContent />}
    </div>
  );
}

export default UserProfileWidget;
