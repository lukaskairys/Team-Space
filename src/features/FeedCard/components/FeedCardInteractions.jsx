import React, { useState } from "react";
import PropTypes from "prop-types";
import { FavoriteTypes } from "../../../utils/FavoriteTypes";

import "./feedCard.scss";
import HeartIcon from "../../../components/HeartIcon/HeartIcon";

function FeedCardInteractions({ likes, id }) {
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
      <HeartIcon
        itemType={FavoriteTypes.STORY}
        itemId={id}
        clickEvent={toggleLike}
        strokeColor={"slate-gray"}
      />
      <p>{liked}</p>
    </>
  );
}

FeedCardInteractions.propTypes = {
  likes: PropTypes.number,
  id: PropTypes.string,
};

export default FeedCardInteractions;
