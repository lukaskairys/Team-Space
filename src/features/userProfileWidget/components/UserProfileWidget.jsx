import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as ArrowDown } from "../../../assets/icons/down.svg";
import jsonserver from "../../../apis/jsonserver";
import "./userProfileWidget.scss";

function UserProfileWidget() {
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setMounted(true);
    const getImage = async () => {
      try {
        const { data } = await jsonserver.get("/userData", {
          cancelToken: source.token,
        });
        setImage(data.userImage);
      } catch (err) {
        if (err) {
          setImage("error");
        }
      }
    };
    if (mounted) {
      getImage();
    }
    return () => {
      source.cancel();
      setMounted(false);
    };
  }, [mounted, image]);

  return (
    <div className="user-profile-widget dropdown ">
      <img
        className="user-profile-widget__picture"
        src={image}
        alt="user profile"
      />
      <ArrowDown className="user-profile-widget__arrow " />
      <ul className="dropdown__content">
        <li className="dropdown__item">Settings</li>
        <li className="dropdown__item">Log out</li>
      </ul>
    </div>
  );
}

export default UserProfileWidget;
