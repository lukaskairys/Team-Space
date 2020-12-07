import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./heartIcon.scss";
import { ReactComponent as Heart } from "assets/icons/heart.svg";

function HeartIcon({ clickEvent, strokeColor }) {
  const [active, setActive] = useState(false);

  const heartClass = classNames({
    "heart-icon": true,
    "heart-icon--active": active,
    "heart-icon--news": strokeColor === "slate-gray",
  });

  const toggleFavorite = () => {
    setActive(!active);
    if (clickEvent !== undefined) {
      clickEvent(active);
    }
  };

  return (
    <>
      <Heart onClick={toggleFavorite} className={heartClass} />
    </>
  );
}

HeartIcon.propTypes = {
  clickEvent: PropTypes.func,
  strokeColor: PropTypes.string,
};

export default HeartIcon;
