import React from "react";
import PropTypes from "prop-types";

import "./navigationButtons.scss";
import { ReactComponent as ChevronRight } from "assets/icons/chevron-right.svg";
import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";

const NavigationButtons = (props) => {
  return (
    <div className="navigation-buttons">
      <button className="navigation-buttons__left" onClick={props.slideLeft}>
        <ChevronLeft className="navigation-buttons__icon" />
      </button>
      <button className="navigation-buttons__right" onClick={props.slideRight}>
        <ChevronRight className="navigation-buttons__icon" />
      </button>
    </div>
  );
};

NavigationButtons.propTypes = {
  slideLeft: PropTypes.func,
  slideRight: PropTypes.func,
};

export default NavigationButtons;
