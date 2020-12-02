import React, { useState } from "react";
import PropTypes from "prop-types";

import "./birthdayCard.scss";
import { ReactComponent as GiftIcon } from "../../../assets/icons/gift-icon.svg";

function BirthdayInteractions({ wishes }) {
  const [wished, setWished] = useState(wishes);
  const [isWished, setIsWished] = useState(false);

  const toggleWish = (event) => {
    const classes = event.target.classList;
    if (isWished) {
      setWished(wished - 1);
      classes.remove("gift-icon--active");
    } else {
      setWished(wished + 1);
      classes.add("gift-icon--active");
    }
    setIsWished(!isWished);
  };

  return (
    <div className="interactions-container">
      <GiftIcon className="gift-icon" onClick={toggleWish} />
      <p>{wished}</p>
    </div>
  );
}

BirthdayInteractions.propTypes = {
  wishes: PropTypes.number,
};

export default BirthdayInteractions;
