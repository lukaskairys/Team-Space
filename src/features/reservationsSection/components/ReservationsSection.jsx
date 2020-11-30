import React, { useState, useEffect, useContext } from "react";

import ReservationCard from "components/ReservationCard/ReservationCard";
import { ReactComponent as Phone } from "assets/images/phone-1.svg";
import { ReactComponent as Door } from "assets/images/door-1.svg";
import { ReactComponent as Book } from "assets/images/book-1.svg";
import { isObjectEmpty } from "utils/objects";
import { context } from "contexts/Context";

import "./reservationsSection.scss";

const ReservationsSection = () => {
  const [reservations, setReservations] = useState({
    devices: 0,
    books: 0,
    rooms: 0,
  });
  const { data, error } = useContext(context);

  useEffect(() => {
    if (!isObjectEmpty(data))
      setReservations((prevState) => ({
        ...prevState,
        devices: data.reservations.devices.length,
        books: data.reservations.books.length,
        rooms: 4,
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
      <h2 className="RESERVATIONS__title">Reservations</h2>
      <div className="RESERVATIONS__cards">
        <ReservationCard
          name={"Devices"}
          caption={"Reserved"}
          path={"/reservations/devices"}
          count={reservations.devices}
          big
        >
          <Phone />
        </ReservationCard>
        <ReservationCard
          name={"Books"}
          caption={"Reserved"}
          path={"/reservations/books"}
          count={reservations.books}
          big
        >
          <Book />
        </ReservationCard>
        <ReservationCard
          name={"Meeting rooms"}
          caption={"Reserved"}
          path={"/"}
          count={reservations.rooms}
          big
        >
          <Door />
        </ReservationCard>
      </div>
    </div>
  );
};

export default ReservationsSection;
