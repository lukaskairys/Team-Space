import React from "react";
import classNames from "classnames";

import PropTypes from "prop-types";

import Button from "components/button/Button";
import { ReactComponent as Heart } from "assets/icons/heart.svg";
import useHeartIcon from "./useHeartIcon";
import { FavoriteTypes } from "../../utils/FavoriteTypes";
import "./heartIcon.scss";

function HeartIcon({
  clickEvent,
  strokeColor,
  itemType,
  itemId,
  title,
  feedCard,
}) {
  const { active, toggleFavorite } = useHeartIcon(
    itemId,
    itemType,
    clickEvent,
    FavoriteTypes
  );
  const heartClass = classNames({
    "favorite__heart-icon": true,
    "favorite__heart-icon--active": active,
    "favorite__heart-icon--news": strokeColor === "slate-gray",
    "favorite__heart-icon--feed-card": feedCard,
  });

  return (
    <Button
      handleClick={toggleFavorite}
      empty={true}
      modifierClass={"favorite"}
      ariaLabelText={
        !active
          ? `Add ${title} ${itemType} to favorite`
          : `Remove ${title} ${itemType} from favorite`
      }
    >
      <Heart className={heartClass} />
    </Button>
  );
}

HeartIcon.propTypes = {
  clickEvent: PropTypes.func,
  strokeColor: PropTypes.string,
  itemType: PropTypes.oneOf(Object.values(FavoriteTypes)),
  itemId: PropTypes.string,
  feedCard: PropTypes.bool,
  title: PropTypes.string,
};

export default HeartIcon;
