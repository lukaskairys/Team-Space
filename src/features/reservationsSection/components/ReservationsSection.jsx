import React, { useState, useEffect } from "react";

import "./reservationsSection.scss";
import ReservationCard from "../../../components/ReservationCard/ReservationCard";
import { ReactComponent as Phone } from "assets/images/phone-1.svg";
import { ReactComponent as Door } from "assets/images/door-1.svg";
import { ReactComponent as Book } from "assets/images/book-1.svg";
import jsonserver from "../../../apis/jsonserver";
import axios from "axios";

const ReservationsSection = () => {
  const [mounted, setMounted] = useState(false);
  const [reservations, setReservations] = useState({
    devices: "-",
    books: "-",
    rooms: 4,
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setMounted(true);

    const getReservations = async () => {
      try {
        const { data } = await jsonserver.get("/userData", {
          cancelToken: source.token,
        });
        setReservations((prevState) => ({
          ...prevState,
          devices: data.reservations.devices.length,
          books: data.reservations.books.length,
        }));
      } catch (err) {
        if (err) {
          setReservations((prevState) => ({
            ...prevState,
            devices: "Err",
            books: "Err",
          }));
        }
      }
    };

    if (mounted) {
      getReservations();
    }

    return () => {
      source.cancel();
      setMounted(false);
    };
  }, [mounted]);

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
