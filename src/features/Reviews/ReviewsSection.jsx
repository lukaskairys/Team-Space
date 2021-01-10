import React, { useState, useEffect, useRef, useContext } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";

import { UserContext } from "contexts/UserContext";
import { Context } from "contexts/Context";
import { useModal } from "utils/useModal";
import useObserver from "utils/useObserver";
import Button from "components/button/Button";
import Modal from "components/Modal/Modal";
import { isObjectEmpty } from "utils/objects";

import LeaveReview from "./LeaveReview";
import ReviewCard from "./ReviewCard";
import "./reviewsSection.scss";

function ReviewsSection() {
  const [restaurant, setRestaurant] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isReviewed, setIsReviewed] = useState();

  const { modalOpen, showModal, setModalOpen, closeModal } = useModal();
  const {
    modalOpen: leaveReviewOpen,
    showModal: showLeaveReview,
    setModalOpen: setLeaveReviewOpen,
    closeModal: closeLeaveReview,
  } = useModal();
  const { id } = useParams();

  const { data, error, isLoading } = useContext(Context);
  const containerRef = useRef(null);
  const showMoreBtnRef = useRef(null);
  const leaveReviewBtnRef = useRef(null);

  const observeWidthCallback = (width) => {
    if (width) setContainerWidth(width);
  };

  useObserver({ callback: observeWidthCallback, element: containerRef });

  const { data: user, setRepeatRequest } = useContext(UserContext);

  const reviewCountToRender = () => {
    if (containerWidth < 1016 && width < 1455) {
      return 2;
    } else if (reviews.length > 3) {
      return 3;
    } else {
      return reviews.length;
    }
  };
  const reviewsToShow = reviews.slice(0, reviewCountToRender());
  const maxCharToShow = 280;

  useEffect(() => {
    try {
      const restaurant = data.filter((restaurant) => restaurant.id === id);
      setRestaurant(restaurant);
      setIsReviewed(
        restaurant[0].reviews.some(
          (review) => review.userName === user.userName
        )
      );
      const reviews = restaurant[0].reviews.filter(
        (review) => review.comment !== ""
      );
      setReviews(reviews);
    } catch (err) {
      if (err) {
        setReviews([]);
      }
    }
  }, [data, id, user.userName]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const renderButton = () => {
    if (
      reviews.length > 3 ||
      reviewsToShow.some((rew) => rew.comment.length > maxCharToShow)
    ) {
      return (
        <Button
          medium={true}
          handleClick={showModal}
          buttonRef={showMoreBtnRef}
          ariaLabel="show more reviews"
        >
          <span>Show more</span>
        </Button>
      );
    }
  };

  if (!isObjectEmpty(data)) {
    return (
      <section ref={containerRef} className="reviews">
        {reviews.length !== 0 && (
          <>
            <h3 className="reviews__title">Reviews</h3>

            <div
              className={classNames("reviews__content", {
                "is-narrow": containerWidth < 572 && width < 1455,
              })}
            >
              {isLoading && <span></span>}
              {error && <span>Error</span>}
              {reviewsToShow.map((review) => (
                <ReviewCard review={review} key={review.id} />
              ))}
            </div>
          </>
        )}

        <div
          className={classNames("reviews__buttons", {
            "is-empty": reviews.length === 0,
          })}
        >
          {renderButton()}

          <Button
            medium={true}
            handleClick={showLeaveReview}
            buttonRef={leaveReviewBtnRef}
          >
            {isReviewed ? (
              <span>edit your review</span>
            ) : (
              <span>leave a review</span>
            )}
          </Button>
        </div>

        {modalOpen && (
          <Modal
            closeModal={() => {
              closeModal(showMoreBtnRef);
            }}
            setModalOpen={setModalOpen}
            modalTitle={"all reviews."}
            buttonRef={showMoreBtnRef}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} inModal={true} />
            ))}
          </Modal>
        )}

        {leaveReviewOpen && (
          <Modal
            closeModal={() => {
              closeLeaveReview(leaveReviewBtnRef);
            }}
            setModalOpen={setLeaveReviewOpen}
            modalTitle={"leave a review."}
            buttonRef={leaveReviewBtnRef}
          >
            <LeaveReview
              closeModal={() => {
                closeLeaveReview(leaveReviewBtnRef);
              }}
              restaurant={restaurant[0]}
              setReviews={setReviews}
              setIsReviewed={setIsReviewed}
              reviews={reviews}
              setRepeatRequest={setRepeatRequest}
              buttonRef={leaveReviewBtnRef}
            />
          </Modal>
        )}
      </section>
    );
  } else if (error) {
    return <div>Error</div>;
  }
  return <div></div>;
}

export default ReviewsSection;
