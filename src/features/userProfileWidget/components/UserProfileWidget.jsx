import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as ArrowDown } from "../../../assets/icons/down.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/icons/settings.svg";
import { ReactComponent as LogOutIcon } from "../../../assets/icons/log-out.svg";
import jsonserver from "../../../apis/jsonserver";
import "./userProfileWidget.scss";

function UserProfileWidget() {
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState("");
  const externalAPI =
    "https://res.cloudinary.com/demo/image/fetch/w_300,h_300,c_fill,g_face,r_max,f_auto/";
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setMounted(true);
    const getImage = async () => {
      try {
        const { data } = await jsonserver.get("/userData", {
          cancelToken: source.token,
        });
        const centeredByFace = `${externalAPI}/${data.userImage}`;
        setImage(centeredByFace);
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
        <li className="dropdown__item">
          <SettingsIcon className="dropdown__item__icon" />
          <span>Settings</span>
        </li>
        <li className="dropdown__item">
          <LogOutIcon className="dropdown__item__icon" />
          <span>Log out</span>
        </li>
      </ul>
    </div>
  );
}

export default UserProfileWidget;
