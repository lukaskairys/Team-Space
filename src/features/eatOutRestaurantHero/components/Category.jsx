import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./category.scss";

export default function Category({ category }) {
  return (
    <Link
      to={`/eat-out/categories/${category.toLowerCase()}`}
      className="category"
    >
      <span className="category__name">{category}</span>
    </Link>
  );
}

Category.propTypes = {
  category: PropTypes.string,
};
