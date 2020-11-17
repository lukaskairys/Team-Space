import React from "react";
import "./Breadcrumbs.scss";
import { ReactComponent as Arrow } from "assets/icons/right.svg";

const Breadcrumbs = () => {
  return (
    <nav className="breadcrumbs">
      <Arrow />
    </nav>
  );
};

export default Breadcrumbs;
