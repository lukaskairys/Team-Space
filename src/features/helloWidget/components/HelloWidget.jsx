import React, { useState, useEffect, useContext } from "react";

import { context } from "contexts/Context";
import { isObjectEmpty } from "utils/objects";

import "./helloWidget.scss";

const options = {
  hour: "numeric",
  minute: "2-digit",
};
const time = new Date().toLocaleTimeString("lt-LT", options);

const HelloWidget = () => {
  const [currentTime, setCurrentTime] = useState(time);
  const [userName, setUserName] = useState("Wizard");

  const { data, error } = useContext(context);
  useEffect(() => {
    let intervalID = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("lt-LT", options));
    }, 1000);

    if (!isObjectEmpty(data)) setUserName(data.userName);
    else if (error) setUserName("Mr. Error");

    return () => {
      clearInterval(intervalID);
    };
  }, [data, error]);

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
