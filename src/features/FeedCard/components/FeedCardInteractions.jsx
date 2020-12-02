import React, { useState } from "react";
import PropTypes from "prop-types";

import "./feedCard.scss";
import HeartIcon from "../../../components/HeartIcon/HeartIcon";

function FeedCardInteractions({ likes }) {
  const [liked, setLiked] = useState(likes);

  const toggleLike = (active) => {
    if (active) {
      setLiked(liked - 1);
    } else {
      setLiked(liked + 1);
    }
  };

  return (
    <>
      <HeartIcon clickEvent={toggleLike} />
      <p>{liked}</p>
    </>
  );
}

FeedCardInteractions.propTypes = {
  likes: PropTypes.number,
};

export default FeedCardInteractions;
