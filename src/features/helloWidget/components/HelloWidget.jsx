import React, { useState, useEffect } from "react";

import "./helloWidget.scss";
import jsonserver from "../../../apis/jsonserver";

const options = {
  hour: "numeric",
  minute: "2-digit",
};
const time = new Date().toLocaleTimeString("lt-LT", options);

const HelloWidget = () => {
  const [currentTime, setCurrentTime] = useState(time);
  const [userName, setUserName] = useState("Wizard");

  useEffect(() => {
    jsonserver
      .get("/userData")
      .then(function ({ data }) {
        setUserName(data.userName);
      })
      .catch(function () {
        setUserName("Mr. Error");
      });

    let intervalID = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("lt-LT", options));
    }, 1000);

    return () => clearInterval(intervalID);
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
