import React, { useState, useEffect } from "react";

import "./reservationsSection.scss";
import ReservationCard from "../../../components/ReservationCard/ReservationCard";
import { ReactComponent as Phone } from "assets/images/phone-1.svg";
import { ReactComponent as Door } from "assets/images/door-1.svg";
import { ReactComponent as Book } from "assets/images/book-1.svg";
import { isObjectEmpty } from "../../../utils/objects";
import { useRequest } from "../../../apis/useRequest";

const ReservationsSection = () => {
  const [reservations, setReservations] = useState({
    devices: "-",
    books: "-",
    rooms: 4,
  });
  const { data, error } = useRequest("/userData");

  useEffect(() => {
    if (!isObjectEmpty(data))
      setReservations((prevState) => ({
        ...prevState,
        devices: data.reservations.devices.length,
        books: data.reservations.books.length,
      }));
    else if (error)
      setReservations((prevState) => ({
        ...prevState,
        devices: "Err",
        books: "Err",
      }));
  }, [data, error]);

  return (
    <div className="RESERVATIONS">
      <h2 className="RESERVATIONS__title">Reservations</h2>
      <div className="RESERVATIONS__cards">
        <ReservationCard
          name={"Devices"}
          path={"/reservations/devices"}
          reserved={reservations.devices}
          size={"big"}
        >
          <Phone />
        </ReservationCard>
        <ReservationCard
          name={"Books"}
          path={"/reservations/books"}
          reserved={reservations.books}
          size={"big"}
        >
          <Book />
        </ReservationCard>
        <ReservationCard
          name={"Meeting rooms"}
          path={"/"}
          reserved={reservations.rooms}
          size={"big"}
        >
          <Door />
        </ReservationCard>
      </div>
    </div>
  );
};

export default ReservationsSection;
