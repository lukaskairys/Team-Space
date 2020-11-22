import React, { useState, useEffect } from "react";

import { useRequest } from "../../apis/useRequest";
import Button from "../../components/button/Button";
import ReviewCard from "./ReviewCard";
import Modal from "./Modal";

import "./reviewsSection.scss";

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // TOTO - get ID from URL
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
          <Button medium={true} handleClick={() => setModalOpen(true)}>
            <span>Show more</span>
          </Button>
        )}

        {modalOpen && (
          <Modal closeModal={() => setModalOpen(false)}>
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
