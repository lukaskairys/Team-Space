import React from "react";
import PropTypes from "prop-types";

import "./sectionTitle.scss";

const SectionTitle = ({ title }) => {
  return <h3 className="restaurants-section-title">{title}</h3>;
};

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default SectionTitle;
