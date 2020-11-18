import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";

import "./Devices.scss";

const Devices = () => {
  return (
    <div className="devices">
      <MainLayout>
        <>
          <Breadcrumbs />
        </>
      </MainLayout>
    </div>
  );
};

export default Devices;
