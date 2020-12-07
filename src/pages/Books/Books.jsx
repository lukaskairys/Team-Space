import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationsList from "features/reservationsPageList/components/ReservationsList";
import ContextProvider from "contexts/ContextProvider";

import "./books.scss";

const Devices = () => {
  // Placeholders to be replaced by state changing items
  const placeholders = {
    searchTerm: "react",
    date: "",
    tags: {
      genres: [],
    },
  };

  return (
    <div className="books">
      <MainLayout>
        <>
          <Breadcrumbs />
          <ContextProvider endpoint="/books">
            <ReservationsList
              searchTerm={placeholders.searchTerm}
              date={placeholders.date}
              tags={placeholders.tags}
            />
          </ContextProvider>
        </>
      </MainLayout>
    </div>
  );
};

export default Devices;
