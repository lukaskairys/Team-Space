import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./birthdayCard.scss";
import { ReactComponent as GiftIcon } from "../../../assets/icons/gift-icon.svg";

function BirthdayInteractions({ wishes }) {
  const [wished, setWished] = useState(wishes);
  const [isWished, setIsWished] = useState(false);

  const toggleWish = (event) => {
    if (isWished) {
      setWished(wished - 1);
    } else {
      setWished(wished + 1);
    }
    setIsWished(!isWished);
  };

  return (
    <>
      <GiftIcon
        className={classNames("gift-icon", { "gift-icon--active": isWished })}
        onClick={toggleWish}
        tabIndex="0"
        aria-label={
          !isWished ? `Send a happy birthday wish` : `Unsend a birthday wish`
        }
      />
      <p>{wished}</p>
    </>
  );
}

BirthdayInteractions.propTypes = {
  wishes: PropTypes.number,
};

export default BirthdayInteractions;
