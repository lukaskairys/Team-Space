import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./heartIcon.scss";
import { ReactComponent as Heart } from "assets/icons/heart.svg";

function HeartIcon({ clickEvent }) {
  const [active, setActive] = useState(false);

  const heartClass = classNames({
    "heart-icon": true,
    "heart-icon--active": active,
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
};

export default HeartIcon;
