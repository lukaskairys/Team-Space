import React from "react";
import PropTypes from "prop-types";

import "./restaurantCardsSection.scss";

const SectionTitle = ({ title }) => {
  return (
    <div className="restaurants-section-title">
      <h3>{title}</h3>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default SectionTitle;
