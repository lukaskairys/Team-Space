import React, { useState, useEffect } from "react";

import { useRequest } from "../../apis/useRequest";
import Button from "../../components/button/Button";
import ReviewCard from "./ReviewCard";
import Modal from "./Modal";

import "./reviewsSection.scss";

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // TODO - get ID from URL
  const id = "120wsdlpx4";

  const { data } = useRequest("/restaurants");

  useEffect(() => {
    try {
      const restaurant = data.restaurantList.filter(
        (restaurant) => restaurant.id === id
      );
      const reviews = restaurant[0].reviews;
      setReviews(reviews);
    } catch (err) {
      if (err) {
        setReviews([]);
      }
    }
  }, [data.restaurantList]);

  const reviewCountToRender = reviews.length > 3 ? 3 : reviews.length;

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

  return (
    <>
      <section className="reviews">
        <h3 className="reviews__title">Reviews</h3>
        <div className="reviews__content">
          {reviews.slice(0, reviewCountToRender).map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>

        {reviews.length > 3 && (
          <Button medium={true} handleClick={showModal}>
            <span>Show more</span>
          </Button>
        )}

        {modalOpen && (
          <Modal closeModal={closeModal}>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} inModal={true} />
            ))}
          </Modal>
        )}
      </section>
    </>
  );
}

export default ReviewsSection;
