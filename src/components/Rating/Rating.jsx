import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { v4 as generateID } from "uuid";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import { roundNumber, countAverage } from "utils/Math";
import { patch } from "apis/services";
import { UserContext } from "contexts/UserContext";
import { ReactComponent as StarIcon } from "assets/icons/star.svg";
import { isObjectEmpty } from "utils/objects";

import "./rating.scss";

const Rating = ({
  restaurant,
  isStatic,
  ratingValue,
  isFromBooks,
  isExpanded,
  updateRating,
  itemId,
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
    } else if (isFromBooks) {
      const newBookRating = {
        id: itemId,
        rating: currentRating,
      };
      const newUser = data;
      if (!newUser.rated.books.some((rating) => rating.id === itemId)) {
        newUser.rated.books.push(newBookRating);
        patch("/users", newUser, data.id);
        setRepeatRequest(newUser);
      } else {
        const removeIndex = newUser.rated.books
          .map((rating) => rating.id)
          .indexOf(itemId);
        ~removeIndex && newUser.rated.books.splice(removeIndex, 1);
        newUser.rated.books.push(newBookRating);
        patch("/users", newUser, data.id);
        setRepeatRequest(newUser);
      }
    }
  };

  //setting initial value from current user ratings
  useEffect(() => {
    if (
      restaurant &&
      restaurant.reviews.some((review) => review.userName === currentUser)
    ) {
      const initialRating = restaurant.reviews.filter(
        (review) => review.userName === currentUser
      )[0].rating;

      if (rating === null && isExpanded) {
        setRating(initialRating);
        updateRating(initialRating);
      } else if (!isExpanded) {
        setRating(initialRating);
      }
    }
  }, [currentUser, restaurant, setRating, isExpanded, rating, updateRating]);

  useEffect(() => {
    if (!isObjectEmpty(data)) {
      if (
        isFromBooks &&
        data.rated.books.some((rating) => rating.id === itemId)
      ) {
        const initialRating = data.rated.books.filter(
          (review) => review.id === itemId
        )[0].rating;
        setRating(initialRating);
      }
    }
  }, [data, isFromBooks, itemId, setRating]);

  if (restaurant || ratingValue) {
    let displayedRating;
    if (restaurant) {
      displayedRating = getRatingAverage(restaurant);
    } else {
      if (rating !== null) {
        const average = (ratingValue + rating) / 2;
        displayedRating = roundNumber(average);
      } else {
        displayedRating = roundNumber(ratingValue);
      }
    }
    return (
      <div
        className={classNames("rating", {
          "rating--is-static": isStatic,
          "rating--is-expanded": isExpanded,
        })}
        role="radiogroup"
        aria-label={classNames(`Average rating ${displayedRating}.`, {
          "Leave a rating from 1 to 5 stars": !isStatic && !isExpanded,
        })}
      >
        <div className="rating__items">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label key={i} className="rating__star">
                <span className="visually-hidden">
                  {ratingValue === 1
                    ? `${ratingValue} star`
                    : `${ratingValue} stars`}
                </span>
                <input
                  className="rating__input visually-hidden"
                  type="radio"
                  name={`rating-for-${
                    !isStatic && !isFromBooks ? restaurant.id : ""
                  }`}
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
                    "rating__icon",
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
          <span className="rating__average" aria-hidden="true">
            {displayedRating}
          </span>
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
  itemId: PropTypes.string,
};
export default Rating;
