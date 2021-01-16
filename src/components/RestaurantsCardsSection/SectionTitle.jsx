import React from "react";
import PropTypes from "prop-types";

import "./sectionTitle.scss";

const SectionTitle = ({ title }) => {
  return <h2 className="restaurants-section-title">{title}</h2>;
};

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default SectionTitle;
