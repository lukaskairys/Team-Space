import React from "react";
import { Helmet } from "react-helmet-async";

import ReservationPage from "components/ReservationPage/ReservationPage";

const Devices = () => {
  return (
    <>
      <Helmet>
        <title>Device Reservations · Team Space</title>
      </Helmet>
      <ReservationPage page={"devices"} />;
    </>
  );
};

export default Devices;
