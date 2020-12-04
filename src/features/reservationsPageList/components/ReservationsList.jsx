import React, { useContext } from "react";
import { context } from "contexts/Context";

import "./reservationsList.scss";
import ReservationCard from "./ReservationCard";

export default function ReservationsList() {
  const { data } = useContext(context);

  if (data?.deviceList) {
    const renderDevices = () => {
      return data.deviceList.map((device, index) => {
        return (
          <ReservationCard
            key={index}
            image={device.image}
            alt={device.deviceType}
            topCaption={device.brand}
            title={device.name}
            quantityOrRating={device.quantity}
          />
        );
      });
    };

    return (
      <div className="reservations-list">
        <div className="reservations-list__cards">{renderDevices()}</div>
      </div>
    );
  } else if (data?.bookList) {
    const renderBooks = () => {
      return data.bookList.map((book, index) => {
        return (
          <ReservationCard
            key={index}
            image={book.image}
            alt={"Book"}
            topCaption={book.author}
            title={book.title}
            quantityOrRating={book.rating.score}
            book
          />
        );
      });
    };

    return (
      <div className="reservations-list">
        <div className="reservations-list__cards">{renderBooks()}</div>
      </div>
    );
  } else {
    return null;
  }
}
