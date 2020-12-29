import React from "react";
import { Helmet } from "react-helmet-async";

import ReservationPage from "components/ReservationPage/ReservationPage";
import SideFilters from "features/sideFilters/SideFilters";
import InputSlider from "components/InputSlider/InputSlider";

const Rooms = () => {
  const inputSliderRenderer = (setCounter) => {
    return (
      <SideFilters
        title={"Seat Count"}
        renderInputSlider={() => (
          <InputSlider min={0} max={200} step={5} setCounter={setCounter} />
        )}
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>Room Reservations</title>
      </Helmet>
      <ReservationPage
        page={"rooms"}
        inputSliderRenderer={inputSliderRenderer}
      />
    </>
  );
};

export default Rooms;
