import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/button/Button";
import ReviewCard from "./ReviewCard";
import jsonserver from "../../apis/jsonserver";

import "./reviewsSection.scss";

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);

  // TOTO - get ID from URL
  const id = "120wsdlpx4";

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getReviews = async () => {
      try {
        const { data } = await jsonserver.get("/restaurants", {
          cancelToken: source.token,
        });

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
    };

    getReviews();

    return () => {
      source.cancel();
    };
  }, []);

  const reviewCountToRender = reviews.length > 3 ? 3 : reviews.length;

  const showModal = () => {
    // TODO
  };

  return (
    <>
      <section className="reviews">
        <h3 className="reviews__title">Reviews</h3>
        <div className="reviews__content">
          {reviews.slice(0, reviewCountToRender).map((review) => (
            <div key={review.id}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {reviews.length > 3 && (
          <Button medium={true} handleClick={showModal}>
            <span>Show more</span>
          </Button>
        )}
      </section>
    </>
  );
}

export default ReviewsSection;
