import React from "react";

import ReservationPage from "components/ReservationPage/ReservationPage";
import UserContextProvider from "contexts/UserContextProvider";
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
    <UserContextProvider>
      <ReservationPage
        page={"rooms"}
        inputSliderRenderer={inputSliderRenderer}
      />
      ;
    </UserContextProvider>
  );
};

export default Rooms;
