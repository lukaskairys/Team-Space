import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { v4 as generateID } from "uuid";

import RatingComponent from "components/Rating/Rating";
import {
  successToast,
  errorToast,
  warnToast,
} from "components/Toasts/ToastHandler";
import { UserContext } from "contexts/UserContext";
import { patch } from "apis/services";
import Button from "components/button/Button";

import "./leaveReview.scss";

function LeaveReview({
  restaurant,
  closeModal,
  setReviews,
  setIsReviewed,
  reviews,
}) {
  const { data, setRepeatRequest } = useContext(UserContext);
  let displayedComment;
  if (reviews.some((review) => review.userName === data.userName)) {
    const currentReview = reviews.filter(
      (review) => review.userName === data.userName
    );
    displayedComment = currentReview[0].comment;
  } else {
    displayedComment = "";
  }

  const [inputValue, setInputValue] = useState(displayedComment);
  const [ratingValue, setRatingValue] = useState();
  const currentUser = data.userName;
  const commentArray = restaurant.reviews;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue === "" && ratingValue === undefined) {
      closeModal();
      warnToast(`Review was not submited because it was empty`);
    } else if (inputValue === "") {
      errorToast(`Please fill in your review`);
    } else if (ratingValue === undefined || ratingValue === null) {
      errorToast(`Please check the star rating box`);
    } else {
      const newReview = {
        userName: currentUser,
        id: generateID(),
        comment: inputValue,
        rating: ratingValue,
      };

      if (!commentArray.some((review) => review.userName === currentUser)) {
        commentArray.unshift(newReview);
        const dataToUpdate = { reviews: [...commentArray] };
        patch("restaurants", dataToUpdate, restaurant.id);
        setReviews(dataToUpdate.reviews);
        setIsReviewed(true);
      } else {
        const updatedArray = commentArray.map((review) => {
          if (review.userName === currentUser) {
            review.rating = ratingValue;
            review.comment = inputValue;
          }
          return review;
        });
        const dataToUpdate = { reviews: [...updatedArray] };
        patch("restaurants", dataToUpdate, restaurant.id);
        setReviews(dataToUpdate.reviews);
        setIsReviewed(true);
      }

      closeModal();
      setRepeatRequest(newReview);
      successToast(`You have left review for ${restaurant.name}`);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDelete = () => {
    const deletedArray = reviews.filter(
      (review) => review.userName !== currentUser
    );
    const dataToUpdate = { reviews: [...deletedArray] };

    patch("restaurants", dataToUpdate, restaurant.id);
    setReviews(dataToUpdate.reviews);
    setInputValue("");
    setIsReviewed(false);
    closeModal();
    setRepeatRequest(dataToUpdate);
    successToast(`Your review for ${restaurant.name} has been deleted`);
  };

  return (
    <div className="leave-review">
      <span className="leave-review__title">{restaurant.name}</span>
      <RatingComponent
        isExpanded={true}
        restaurant={restaurant}
        updateRating={setRatingValue}
      />
      <form action="" className="leave-review__form" onSubmit={handleSubmit}>
        <label htmlFor="review-text" className="leave-review__label">
          Your review:
        </label>

        <textarea
          className="form-input leave-review__content"
          name="review-text"
          id="review-text"
          rows="7"
          cols="49"
          placeholder="Write about your experiences here..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="leave-review__buttons">
          <Button medium={true} type={"submit"}>
            Submit review
          </Button>

          {commentArray.some((review) => review.userName === currentUser) && (
            <Button medium={true} handleClick={handleDelete}>
              delete review
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

LeaveReview.propTypes = {
  restaurant: PropTypes.PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    reviews: PropTypes.array,
  }),
  closeModal: PropTypes.func,
  setReviews: PropTypes.func,
  setIsReviewed: PropTypes.func,
  reviews: PropTypes.array,
};

export default LeaveReview;
