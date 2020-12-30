import React from "react";
import { Helmet } from "react-helmet-async";
import { isObjectEmpty } from "utils/objects";

import ReservationPage from "components/ReservationPage/ReservationPage";
import SideFilters from "features/sideFilters/SideFilters";
import InputSlider from "components/InputSlider/InputSlider";

const Rooms = () => {
  const maxRange = (data) => {
    if (data === undefined || isObjectEmpty(data)) return 50;
    const largest = data.reduce((prev, cur) =>
      prev["seatCount"] > cur["seatCount"] ? prev : cur
    );
    return largest["seatCount"];
  };

  const inputSliderRenderer = (setCounter, listData) => {
    return (
      <SideFilters
        title={"Seat Count"}
        renderInputSlider={() => (
          <InputSlider
            min={0}
            max={maxRange(listData)}
            step={5}
            setCounter={setCounter}
          />
        )}
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>Room Reservations · Team Space</title>
      </Helmet>
      <ReservationPage
        page={"rooms"}
        inputSliderRenderer={inputSliderRenderer}
      />
    </>
  );
};

export default Rooms;
