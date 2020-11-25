import React from "react";

import EatOutHeroSlider from "./EatOutHeroSlider";
import "./eatOutHeroWidget.scss";

const EatOutHeroWidget = () => {
  return (
    <div className="eat-out-hero">
      <h1 className="eat-out-hero__header">Hungry? Find the best place!</h1>
      <EatOutHeroSlider />
    </div>
  );
};

export default EatOutHeroWidget;
