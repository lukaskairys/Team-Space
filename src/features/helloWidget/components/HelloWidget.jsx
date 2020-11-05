import "./helloWidget.scss";
import React, { useState, useEffect } from "react";

let options = {
  hour: "numeric",
  minute: "2-digit",
};
let time = new Date().toLocaleTimeString("lt-LT", options);

const HelloWidget = () => {
  const name = "Wizard";
  const [state, setState] = useState(time);

  useEffect(() => {
    let intervalID = setInterval(() => {
      setState(new Date().toLocaleTimeString("lt-LT", options));
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const renderGreeting = () => {
    let now = new Date().getHours();
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
      <time className="hello-widget__time">{state}</time>
      <h1 className="hello-widget__greeting">{`${renderGreeting()}, ${name}`}</h1>
    </div>
  );
};

export default HelloWidget;
