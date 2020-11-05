import "./helloWidget.scss";
import React, { useState, useEffect } from "react";

let options = {
  hour: "numeric",
  minute: "2-digit",
};
let time = new Date().toLocaleTimeString("lt-LT", options);

export const HelloWidget = () => {
  const name = "Wizard";
  const [state, setState] = useState(time);

  useEffect(() => {
    setInterval(() => {
      setState(new Date().toLocaleTimeString("lt-LT", options));
    }, 1000);
  });

  return (
    <div className="hello-widget">
      <time className="hello-widget__time">{state}</time>
      <h1 className="hello-widget__greeting">Good afternoon, {name}</h1>
    </div>
  );
};

export default HelloWidget;
