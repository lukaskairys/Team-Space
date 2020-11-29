import React, { useState } from "react";
import classNames from "classnames";

import "./heartIcon.scss";
import { ReactComponent as Heart } from "assets/icons/heart.svg";

function HeartIcon() {
  const [active, setActive] = useState(false);

  const heartClass = classNames({
    "heart-icon": true,
    "heart-icon--active": active,
  });

  const toggleFavorite = () => {
    setActive(!active);
  };

  return (
    <>
      <Heart onClick={toggleFavorite} className={heartClass} />
    </>
  );
}

export default HeartIcon;
