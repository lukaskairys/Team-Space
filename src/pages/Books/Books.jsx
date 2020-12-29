import React from "react";
import { Helmet } from "react-helmet-async";

import ReservationPage from "components/ReservationPage/ReservationPage";
import SideFilters from "features/sideFilters/SideFilters";
import InputSlider from "components/InputSlider/InputSlider";

const Books = () => {
  const inputSliderRenderer = (setCounter) => {
    return (
      <SideFilters
        title={"Rating"}
        renderInputSlider={() => (
          <InputSlider min={0} max={5} step={0.5} setCounter={setCounter} />
        )}
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>Book Reservations</title>
      </Helmet>
      <ReservationPage
        page={"books"}
        inputSliderRenderer={inputSliderRenderer}
      />
      ;
    </>
  );
};

export default Books;
