import React from "react";
import PropTypes from "prop-types";

import "./category.scss";

export default function Category({ category }) {
  return (
    <div className="category">
      <span className="category__name">{category}</span>
    </div>
  );
}

Category.propTypes = {
  category: PropTypes.string,
};
