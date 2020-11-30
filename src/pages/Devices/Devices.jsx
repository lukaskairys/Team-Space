import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ContextProvider from "contexts/ContextProvider";

import "./Devices.scss";

const Devices = () => {
  return (
    <div className="devices">
      <ContextProvider endpoint="/devices">
        <MainLayout>
          <>
            <Breadcrumbs />
          </>
        </MainLayout>
      </ContextProvider>
    </div>
  );
};

export default Devices;
