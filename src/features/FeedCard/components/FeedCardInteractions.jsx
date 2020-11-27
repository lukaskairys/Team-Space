import React, { useState } from "react";
import PropTypes from "prop-types";
import "./feedCard.scss";
import { ReactComponent as HeartIcon } from "../../../assets/icons/heart-icon.svg";

function FeedCardInteractions({ likes }) {
  const [liked, setLiked] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (event) => {
    const classes = event.target.classList;
    if (isLiked) {
      setLiked(liked - 1);
      classes.remove("heart-icon--active");
    } else {
      setLiked(liked + 1);
      classes.add("heart-icon--active");
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <HeartIcon className="heart-icon" onClick={toggleLike} />
      <p>{liked}</p>
    </>
  );
}

FeedCardInteractions.propTypes = {
  likes: PropTypes.number,
};

export default FeedCardInteractions;
