import React from "react";
import { Helmet } from "react-helmet-async";

import ReservationPage from "components/ReservationPage/ReservationPage";
import UserContextProvider from "contexts/UserContextProvider";

const Devices = () => {
  return (
    <UserContextProvider>
      <Helmet>
        <title>Device Reservations</title>
      </Helmet>
      <ReservationPage page={"devices"} />;
    </UserContextProvider>
  );
};

export default Devices;
