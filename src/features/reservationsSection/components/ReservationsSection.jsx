import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import ReservationCardLink from "components/ReservationCardLink/ReservationCardLink";
import { ReactComponent as Phone } from "assets/images/phone-1.svg";
import { ReactComponent as Door } from "assets/images/door-1.svg";
import { ReactComponent as Book } from "assets/images/book-1.svg";
import { isObjectEmpty } from "utils/objects";
import { UserContext } from "contexts/UserContext";

import "./reservationsSection.scss";

const ReservationsSection = ({ title, customMessageRenderer }) => {
  const [reservations, setReservations] = useState({
    devices: 0,
    books: 0,
    rooms: 0,
  });
  const { data, error } = useContext(UserContext);

  useEffect(() => {
    if (!isObjectEmpty(data))
      setReservations((prevState) => ({
        ...prevState,
        devices: data.reservations.devices.length,
        books: data.reservations.books.length,
        rooms: data.reservations.rooms.length,
      }));
    else if (error)
      setReservations((prevState) => ({
        ...prevState,
        devices: "Err",
        books: "Err",
        rooms: "Err",
      }));
  }, [data, error]);

  return (
    <div className="RESERVATIONS">
      <h2 className="RESERVATIONS__title">{title}</h2>
      {customMessageRenderer && customMessageRenderer()}
      <div className="RESERVATIONS__cards">
        <ReservationCardLink
          name={"Devices"}
          caption={"Reserved"}
          path={"/reservations/devices"}
          count={reservations.devices}
          big
        >
          <Phone className="RESERVATIONS__image" />
        </ReservationCardLink>
        <ReservationCardLink
          name={"Books"}
          caption={"Reserved"}
          path={"/reservations/books"}
          count={reservations.books}
          big
        >
          <Book className="RESERVATIONS__image" />
        </ReservationCardLink>
        <ReservationCardLink
          name={"Meeting rooms"}
          caption={"Reserved"}
          path={"/reservations/rooms"}
          count={reservations.rooms}
          big
        >
          <Door className="RESERVATIONS__image" />
        </ReservationCardLink>
      </div>
    </div>
  );
};

ReservationsSection.propTypes = {
  title: PropTypes.string,
  customMessageRenderer: PropTypes.func,
};

export default ReservationsSection;
