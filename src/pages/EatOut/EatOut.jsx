import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import EatOutInfo from "features/EatOut/components/EatOutInfo/EatOutInfo";

import "./EatOut.scss";

const EatOut = () => {
  return (
    <div className="eat-out">
      <MainLayout>
        <>
          <Breadcrumbs />
          <EatOutInfo />
        </>
      </MainLayout>
    </div>
  );
};

export default EatOut;
