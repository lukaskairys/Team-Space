import React from "react";

import ReservationPage from "components/ReservationPage/ReservationPage";
import UserContextProvider from "contexts/UserContextProvider";

const Books = () => {
  return (
    <UserContextProvider>
      <ReservationPage page={"books"} />;
    </UserContextProvider>
  );
};

export default Books;
