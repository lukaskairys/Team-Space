import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as IconAvailable } from "assets/icons/icon-available.svg";
import { ReactComponent as IconReserved } from "assets/icons/icon-reserved.svg";
import Button from "components/button/Button";
import HeartIcon from "components/HeartIcon/HeartIcon";
import Rating from "components/Rating/Rating";
import { FavoriteTypes } from "../../../utils/FavoriteTypes";

import "./reservationCard.scss";
import { formatDateToGB, isUnavailable } from "../utils/dateFormatters";
export default function Card({
  image,
  alt,
  topCaption,
  title,
  quantityOrRating,
  bookedUntil,
  date,
  book,
  id,
}) {
  let buttonDisabled = false;
  const renderStatus = () => {
    const unavailableDate = formatDateToGB(bookedUntil);
    const itemUnavailable = isUnavailable(date, bookedUntil);
    if (itemUnavailable) {
      buttonDisabled = true;
      return (
        <>
          <IconReserved className="reservation-card__icon" />
          <span className="reservation-card__caption">{`Booked until ${unavailableDate}`}</span>
        </>
      );
    } else if (typeof quantityOrRating === "number" && quantityOrRating === 0) {
      buttonDisabled = true;
      return (
        <>
          <IconReserved className="reservation-card__icon" />
          <span className="reservation-card__caption">Unavailable</span>
        </>
      );
    } else {
      buttonDisabled = false;
      return (
        <>
          <IconAvailable className="reservation-card__icon" />
          <span className="reservation-card__caption">Available</span>
        </>
      );
    }
  };
  return (
    <div className="reservation-card">
      <figure className="reservation-card__img-box">
        <img src={image} alt={alt} className="reservation-card__image" />
      </figure>
      <div className="reservation-card__content">
        <span className="reservation-card__caption">{topCaption}</span>
        <HeartIcon itemType={FavoriteTypes.BOOK} itemId={id} />
        <h3 className="reservation-card__title">{title}</h3>
        <div className="reservation-card__status">{renderStatus()}</div>
        <div className="reservation-card__cta">
          {book ? (
            <Rating ratingValue={quantityOrRating} isFromBooks={true} />
          ) : (
            <span className="reservation-card__caption">{`Quantity: ${quantityOrRating}`}</span>
          )}
          <Button medium blank>
            View more
          </Button>
          <Button medium disabled={buttonDisabled ? true : false}>
            Book
          </Button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  topCaption: PropTypes.string,
  title: PropTypes.string,
  quantityOrRating: PropTypes.number,
  bookedUntil: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.string,
  book: PropTypes.bool,
  id: PropTypes.string,
};
