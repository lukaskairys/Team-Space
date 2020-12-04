import React, { useContext, useState } from "react";
import { context } from "contexts/Context";
import groupArray from "utils/groupArray";

import "./reservationsList.scss";
import ReservationCard from "./ReservationCard";
import Pagination from "./Pagination";

export default function ReservationsList() {
  const { data } = useContext(context);
  const [page, setPage] = useState(0);

  if (data?.deviceList) {
    const devices = groupArray(data.deviceList, 6);
    const pageCount = devices.length - 1;
    const renderDevices = () => {
      return devices[page].map((device, index) => {
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
        <Pagination page={page} setPage={setPage} pageCount={pageCount} />
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
        <Pagination />
      </div>
    );
  } else {
    return null;
  }
}
