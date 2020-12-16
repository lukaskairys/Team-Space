import React from "react";

import ReservationPage from "components/ReservationPage/ReservationPage";
import UserContextProvider from "contexts/UserContextProvider";

const Devices = () => {
  return (
    <UserContextProvider>
      <ReservationPage page={"devices"} />;
    </UserContextProvider>
  );
};

export default Devices;
