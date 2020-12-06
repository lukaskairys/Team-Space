import React from "react";

import GeneralSideFilters from "./GeneralSideFilters";

function SideFilters() {
  //TODO get which filterItems to render + title
  const title = "device type";
  const filterItems = [
    "Accessories",
    "Desktop",
    "Gadgets and hardware",
    "Laptop",
    "Mobile",
    "Tablet",
  ];

  return (
    <>
      <GeneralSideFilters title={title} filterItems={filterItems} />
    </>
  );
}

export default SideFilters;
