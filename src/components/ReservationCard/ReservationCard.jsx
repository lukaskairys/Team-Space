import React from "react";
import PropTypes from "prop-types";

import { useModal } from "utils/useModal";
import { ReactComponent as IconAvailable } from "assets/icons/icon-available.svg";
import { ReactComponent as IconReserved } from "assets/icons/icon-reserved.svg";
import Button from "components/button/Button";
import HeartIcon from "components/HeartIcon/HeartIcon";
import Rating from "components/Rating/Rating";
import Modal from "components/Modal/Modal";
import ConfirmationModalContent from "components/Confirmation/ConfirmationModalContent";

import "./reservationCard.scss";
import {
  formatDateToGB,
  isUnavailable,
} from "features/reservationsPageList/utils/dateFormatters";
export default function Card({
  image,
  alt,
  topCaption,
  title,
  quantityOrRating,
  bookedUntil,
  date,
  listName,
  favoriteType,
  id,
  isFromReserved,
  cancelReservation,
}) {
  const { modalOpen, showModal, setModalOpen, closeModal } = useModal();

  let buttonDisabled = false;
  const renderStatus = () => {
    const unavailableDate = formatDateToGB(bookedUntil);
    const itemUnavailable = isUnavailable(date, bookedUntil);
    if (itemUnavailable) {
      buttonDisabled = true;
      return (
        <>
          <IconReserved className="reservation-card__icon" />
          <p className="reservation-card__caption">
            Booked until <time dateTime={bookedUntil}>{unavailableDate}</time>
          </p>
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

  const renderBottomCaption = () => {
    switch (listName) {
      case "deviceList":
        return (
          <span className="reservation-card__caption">{`Quantity: ${quantityOrRating}`}</span>
        );
      case "bookList":
        return (
          <Rating
            ratingValue={quantityOrRating}
            isFromBooks={true}
            itemId={id}
          />
        );
      case "roomList":
        return (
          <span className="reservation-card__caption">{`Seat Count: ${quantityOrRating}`}</span>
        );
      default:
        break;
    }
  };

  return (
    <article className="reservation-card">
      <figure className="reservation-card__img-box">
        <img src={image} alt={alt} className="reservation-card__image" />
      </figure>
      <div className="reservation-card__content">
        <span className="reservation-card__caption">{topCaption}</span>
        <HeartIcon itemType={favoriteType} itemId={id} />
        <h3 className="reservation-card__title">{title}</h3>
        <div className="reservation-card__status">{renderStatus()}</div>
        <div className="reservation-card__cta">
          {renderBottomCaption()}
          <div>
            <Button medium blank>
              View more
            </Button>
            {isFromReserved ? (
              <Button medium disabled={false} handleClick={showModal}>
                Cancel
              </Button>
            ) : (
              <Button medium disabled={buttonDisabled ? true : false}>
                Book
              </Button>
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal closeModal={closeModal} setModalOpen={setModalOpen}>
          <ConfirmationModalContent
            confirm={() => cancelReservation(id)}
            cancel={closeModal}
            title={"Do you really want to cancel your reservation?"}
            cancelText={"no, keep it"}
            confirmText={"yes, cancel"}
          />
        </Modal>
      )}
    </article>
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
  listName: PropTypes.string,
  favoriteType: PropTypes.string,
  id: PropTypes.string,
  isFromReserved: PropTypes.bool,
  cancelReservation: PropTypes.func,
};
