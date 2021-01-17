import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { UserContext } from "contexts/UserContext";
import { isObjectEmpty } from "utils/objects";

import "./helloWidget.scss";

const HelloWidget = ({ currentTime }) => {
  const [userName, setUserName] = useState(null);

  const { data } = useContext(UserContext);

  useEffect(() => {
    if (!isObjectEmpty(data)) setUserName(data.userName);
  }, [data]);

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
    <article className="hello-widget">
      <time className="hello-widget__time" dateTime={currentTime}>
        {currentTime}
      </time>
      <h1 className="hello-widget__greeting">
        {userName ? `${renderGreeting()}, ${userName}` : renderGreeting()}
      </h1>
    </article>
  );
};

HelloWidget.propTypes = {
  currentTime: PropTypes.string,
};

export default HelloWidget;
