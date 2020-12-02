import React from "react";
import PropTypes from "prop-types";

import "./category.scss";
import { Link } from "react-router-dom";

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
