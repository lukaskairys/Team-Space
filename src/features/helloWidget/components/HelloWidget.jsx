import React, { useState, useEffect } from "react";
import axios from "axios";

import "./helloWidget.scss";
import jsonserver from "../../../apis/jsonserver";

const options = {
  hour: "numeric",
  minute: "2-digit",
};
const time = new Date().toLocaleTimeString("lt-LT", options);

const HelloWidget = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(time);
  const [userName, setUserName] = useState("Wizard");

  useEffect(() => {
    let intervalID = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("lt-LT", options));
    }, 1000);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setMounted(true);
    const getUserName = async () => {
      try {
        const { data } = await jsonserver.get("/userData", {
          cancelToken: source.token,
        });
        if (mounted) setUserName(data.userName);
      } catch (err) {
        if (err) {
          setUserName("Mr. Error");
        }
      }
    };

    getUserName();

    return () => {
      clearInterval(intervalID);
      source.cancel();
      setMounted(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderGreeting = () => {
    const now = parseInt(currentTime.slice(0, 2));
    if (now < 12) {
      return "Good morning";
    } else if (now < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <div className="hello-widget">
      <time className="hello-widget__time">{currentTime}</time>
      <h1 className="hello-widget__greeting">{`${renderGreeting()}, ${userName}`}</h1>
    </div>
  );
};

export default HelloWidget;
