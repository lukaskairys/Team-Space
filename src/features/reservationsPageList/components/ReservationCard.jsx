import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as StatusIcon } from "assets/icons/icon-available.svg";
import Button from "components/button/Button";
import HeartIcon from "components/HeartIcon/HeartIcon";

import "./reservationCard.scss";
import Rating from "components/Rating/Rating";

export default function Card({
  book,
  image,
  alt,
  topCaption,
  title,
  quantityOrRating,
}) {
  return (
    <div className="reservation-card">
      <figure className="reservation-card__img-box">
        <img src={image} alt={alt} className="reservation-card__image" />
      </figure>
      <div className="reservation-card__content">
        <span className="reservation-card__caption">{topCaption}</span>
        <HeartIcon />
        <h3 className="reservation-card__title">{title}</h3>
        <div className="reservation-card__status">
          <StatusIcon className="reservation-card__icon" />
          <span className="reservation-card__caption">Available</span>
        </div>
        <div className="reservation-card__cta">
          {book ? (
            <Rating ratingValue={quantityOrRating} />
          ) : (
            <span className="reservation-card__caption">{`Quantity: ${quantityOrRating}`}</span>
          )}
          <Button medium blank>
            View more
          </Button>
          <Button medium>Book</Button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  book: PropTypes.bool,
  image: PropTypes.string,
  alt: PropTypes.string,
  topCaption: PropTypes.string,
  title: PropTypes.string,
  quantityOrRating: PropTypes.number,
};
