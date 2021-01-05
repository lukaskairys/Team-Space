import React, { useState, useEffect, useCallback, useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { FavoriteTypes } from "../../utils/FavoriteTypes";
import { isObjectEmpty } from "../../utils/objects";
import Button from "components/button/Button";
import { ReactComponent as Heart } from "assets/icons/heart.svg";
import { UserContext } from "../../contexts/UserContext";
import { patch } from "../../apis/services";

import "./heartIcon.scss";

// eslint-disable-next-line react/prop-types
function HeartIcon({ clickEvent, strokeColor, itemType, itemId, title }) {
  const [active, setActive] = useState(false);

  const { data, likeState, setLikeState } = useContext(UserContext);

  const heartClass = classNames({
    "heart-icon": true,
    "heart-icon--active": active,
    "heart-icon--news": strokeColor === "slate-gray",
  });

  const toggleFavorite = () => {
    active === true ? remove(itemId, data) : add(itemId, data);
    setActive(!active);
    setLikeState(`${itemId}-${active}`);
    if (clickEvent !== undefined) {
      clickEvent(active);
    }
  };

  const genericHandler = useCallback(
    (userInfo, itemId, handler) => {
      switch (itemType) {
        case FavoriteTypes.BOOK:
          handler(userInfo.liked.books, itemId);
          break;
        case FavoriteTypes.STORY:
          handler(userInfo.liked.stories, itemId);
          break;
        case FavoriteTypes.RESTAURANT:
          handler(userInfo.liked.restaurants, itemId);
          break;
        case FavoriteTypes.DEVICE:
          handler(userInfo.liked.devices, itemId);
          break;
        case FavoriteTypes.ROOM:
          handler(userInfo.liked.rooms, itemId);
          break;
        default:
          break;
      }
    },
    [itemType]
  );

  const remove = (itemId, data) => {
    genericHandler(data, itemId, removeHandler);
    patch("/users", data, data.id);
  };

  const add = (itemId, user) => {
    genericHandler(user, itemId, addHandler);
    patch("/users", user, user.id);
  };

  useEffect(() => {
    if (!isObjectEmpty(data)) {
      genericHandler(data, itemId, InitialHandler);
    }
  }, [data, genericHandler, itemId, likeState]);

  const removeHandler = (user, id) => {
    if (!user) return;
    const removeIndex = user.map((like) => like.id).indexOf(id);

    ~removeIndex && user.splice(removeIndex, 1);
  };

  const addHandler = (user, id) => {
    if (!user) return;
    if (!user.some((e) => e.id === id)) {
      user.push({ id });
    }
  };

  const InitialHandler = (user, id) => {
    if (!user) return;
    const doesContain = user.some((liked) => liked.id === id);
    if (doesContain) setActive(true);
    else setActive(false);
  };

  return (
    <Button
      handleClick={toggleFavorite}
      empty={true}
      ariaLabel={
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
};

export default HeartIcon;
