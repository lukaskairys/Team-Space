import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import { useRequest } from "../../apis/useRequest";
import Button from "../../components/button/Button";
import ReviewCard from "./ReviewCard";
import Modal from "./Modal";
import "./reviewsSection.scss";

import useObserver from "utils/useObserver";

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef(null);

  const observeWidthCallback = (width) => {
    if (width) setContainerWidth(width);
  };

  useObserver({ callback: observeWidthCallback, element: containerRef });

  const { id } = useParams();
  const { data, error, isLoading } = useRequest("/restaurants");

  const reviewCountToRender = () => {
    if (containerWidth < 1070 && width < 1455) {
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
      const reviews = restaurant[0].reviews.filter(
        (review) => review.comment !== ""
      );
      setReviews(reviews);
    } catch (err) {
      if (err) {
        setReviews([]);
      }
    }
  }, [data, id]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const showModal = () => {
    setModalOpen(true);
    const scrollY = document.documentElement.style.getPropertyValue(
      "--scroll-y"
    );
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}`;
  };

  const closeModal = () => {
    setModalOpen(false);
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };

  window.addEventListener("scroll", () => {
    document.documentElement.style.setProperty(
      "--scroll-y",
      `${window.scrollY}px`
    );
  });

  const renderButton = () => {
    if (
      reviews.length > 3 ||
      reviewsToShow.some((rew) => rew.comment.length > maxCharToShow)
    ) {
      return (
        <Button medium={true} handleClick={showModal}>
          <span>Show more</span>
        </Button>
      );
    }
  };
  if (reviews.length === 0) return null;

  return (
    <section ref={containerRef} className="reviews">
      <h3 className="reviews__title">Reviews</h3>
      <div
        className={classNames("reviews__content", {
          "is-narrow": containerWidth < 700 && width < 1455,
        })}
      >
        {isLoading && <span></span>}
        {error && <span>Error</span>}
        {reviewsToShow.map((review) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>

      {renderButton()}

      {modalOpen && (
        <Modal closeModal={closeModal} setModalOpen={setModalOpen}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} inModal={true} />
          ))}
        </Modal>
      )}
    </section>
  );
}

export default ReviewsSection;
