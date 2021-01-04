import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { v4 as generateID } from "uuid";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import { roundNumber, countAverage } from "utils/Math";
import { patch } from "apis/services";
import { UserContext } from "contexts/UserContext";
import { ReactComponent as StarIcon } from "assets/icons/star.svg";

import "./rating.scss";

const Rating = ({
  restaurant,
  isStatic,
  ratingValue,
  isFromBooks,
  isExpanded,
  updateRating,
}) => {
  //Getting current user name
  const { data, setRepeatRequest } = useContext(UserContext);
  const currentUser = data.userName;

  const [rating, setRating] = useStateWithCallbackLazy(null);
  const [hover, setHover] = useState(null);

  const getRatingAverage = (restaurant) => {
    const ratingsArray = restaurant.reviews.map((x) => x.rating);
    const ratingAverages = countAverage(ratingsArray);
    return roundNumber(ratingAverages);
  };

  const handleNewRating = (currentRating) => {
    if (!isStatic && !isFromBooks && !isExpanded) {
      const newComment = {
        userName: currentUser,
        id: generateID(),
        comment: "",
        rating: currentRating,
      };

      const newCommentArray = restaurant.reviews;

      if (!newCommentArray.some((review) => review.userName === currentUser)) {
        newCommentArray.unshift(newComment);
        const dataToUpdate = { reviews: [...newCommentArray] };
        patch("restaurants", dataToUpdate, restaurant.id);
      } else {
        const updatedArray = newCommentArray.map((review) => {
          if (review.userName === currentUser) {
            review.rating = currentRating;
          }
          return review;
        });
        const dataToUpdate = { reviews: [...updatedArray] };
        patch("restaurants", dataToUpdate, restaurant.id);
      }
    }
  };

  //setting initial value from current user ratings
  useEffect(() => {
    if (
      restaurant &&
      !isExpanded &&
      restaurant.reviews.some((review) => review.userName === currentUser)
    ) {
      const rating = restaurant.reviews.filter(
        (review) => review.userName === currentUser
      )[0].rating;
      setRating(rating);
    }
  }, [currentUser, restaurant, setRating, isExpanded]);

  if (restaurant || ratingValue) {
    let displayedRating;
    if (restaurant) {
      displayedRating = getRatingAverage(restaurant);
    } else {
      displayedRating = roundNumber(ratingValue);
    }

    return (
      <div
        className={classNames("rating-container", {
          "rating-container--is-static": isStatic,
          "rating-container--is-expanded": isExpanded,
        })}
      >
        <div className="rating-container__items">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label key={i} className="rating-container__label">
                <input
                  className="rating-container__input"
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onChange={() => {
                    setRating(ratingValue, (currentRating) => {
                      handleNewRating(currentRating);
                    });
                    setRepeatRequest(rating);
                    if (isExpanded) {
                      updateRating(ratingValue);
                    }
                  }}
                />
                <StarIcon
                  className={classNames(
                    "rating-container__icon",
                    {
                      "is-filled": ratingValue <= (hover || rating),
                    },
                    {
                      "is-expandable": ratingValue > 1,
                    }
                  )}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          <span className="rating-container__average">{displayedRating}</span>
        </div>
      </div>
    );
  }
  return <div></div>;
};

Rating.propTypes = {
  isStatic: PropTypes.bool,
  isFromBooks: PropTypes.bool,
  isExpanded: PropTypes.bool,
  ratingValue: PropTypes.number,
  restaurant: PropTypes.shape({
    reviews: PropTypes.array,
    id: PropTypes.string,
  }),
  updateRating: PropTypes.func,
};
export default Rating;
