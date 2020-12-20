import React from "react";

import ReservationPage from "components/ReservationPage/ReservationPage";
import UserContextProvider from "contexts/UserContextProvider";

const Rooms = () => {
  return (
    <UserContextProvider>
      <ReservationPage page={"rooms"} />;
    </UserContextProvider>
  );
};

export default Rooms;
