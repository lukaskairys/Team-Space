import React from "react";
import PropTypes from "prop-types";

import "./navigationButtons.scss";

const NavigationButtons = (props) => {
  return (
    <div className="navigation-buttons">
      <button className="navigation-buttons__left" onClick={props.slideLeft}>
        &lt;
      </button>
      <button className="navigation-buttons__right" onClick={props.slideRight}>
        &gt;
      </button>
    </div>
  );
};

NavigationButtons.propTypes = {
  slideLeft: PropTypes.func,
  slideRight: PropTypes.func,
};

export default NavigationButtons;
