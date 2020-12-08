import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useRequest } from "../../apis/useRequest";
import Button from "../../components/button/Button";
import ReviewCard from "./ReviewCard";
import Modal from "./Modal";

import "./reviewsSection.scss";

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const { id } = useParams();
  const { data, error, isLoading } = useRequest("/restaurants");

  const reviewCountToRender = () => {
    if (width < 1293) {
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
      const restaurant = data.restaurantList.filter(
        (restaurant) => restaurant.id === id
      );
      const reviews = restaurant[0].reviews;

      setReviews(reviews);

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } catch (err) {
      if (err) {
        setReviews([]);
      }
    }
  }, [data.restaurantList, id]);

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
    <section className="reviews">
      <h3 className="reviews__title">Reviews</h3>
      <div className="reviews__content">
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
