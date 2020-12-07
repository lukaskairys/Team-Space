import React, { useState, useEffect, useCallback, useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { FavoriteTypes } from "../../utils/FavoriteTypes";
import { isObjectEmpty } from "../../utils/objects";
import "./heartIcon.scss";
import { ReactComponent as Heart } from "assets/icons/heart.svg";
import { UserContext } from "../../contexts/UserContext";
import { update } from "./patchService";

function HeartIcon({ clickEvent, strokeColor, itemType, itemId }) {
  const [active, setActive] = useState(false);
  ///TODO after login functionality fetch user user from session or SMTH. (Right now gets the user currently set in the context)
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
        default:
          break;
      }
    },
    [itemType]
  );

  const remove = (itemId, data) => {
    genericHandler(data, itemId, removeHandler);
    update(data.id, data);
  };

  const add = (itemId, user) => {
    genericHandler(user, itemId, addHandler);
    update(user.id, user);
  };

  useEffect(() => {
    if (!isObjectEmpty(data)) {
      genericHandler(data, itemId, InitialHandler);
    }
  }, [data, genericHandler, itemId, likeState]);

  const removeHandler = (userLikeduser, id) => {
    if (!userLikeduser) return;
    const removeIndex = userLikeduser.map((like) => like.id).indexOf(id);

    ~removeIndex && userLikeduser.splice(removeIndex, 1);
  };

  const addHandler = (userLikeduser, id) => {
    if (!userLikeduser) return;
    if (!userLikeduser.some((e) => e.id === id)) {
      userLikeduser.push({ id });
    }
  };

  const InitialHandler = (userLikeduser, id) => {
    if (!userLikeduser) return;
    const doesContain = userLikeduser.some((liked) => liked.id === id);
    if (doesContain) setActive(true);
    else setActive(false);
  };

  return (
    <>
      <Heart onClick={toggleFavorite} className={heartClass} />
    </>
  );
}

HeartIcon.propTypes = {
  clickEvent: PropTypes.func,
  strokeColor: PropTypes.string,
  itemType: PropTypes.string,
  itemId: PropTypes.string,
};

export default HeartIcon;
