import React, { useState } from "react";
import PropTypes from "prop-types";
import { FavoriteTypes } from "../../../utils/FavoriteTypes";

import "./feedCard.scss";
import HeartIcon from "../../../components/HeartIcon/HeartIcon";
import { patch } from "../../../apis/services";

function FeedCardInteractions({ likes, id }) {
  const [liked, setLiked] = useState(likes);

  const toggleLike = (active) => {
    if (active) {
      setLiked(liked - 1);
      patch("/stories", { likes: liked - 1 }, id);
    } else {
      setLiked(liked + 1);
      patch("/stories", { likes: liked + 1 }, id);
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
