import React from "react";
import PropTypes from "prop-types";

import "./Pagination.scss";
import { ReactComponent as ChevronRight } from "assets/icons/chevron-right.svg";
import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const slideLeft = () => {
    let nextPage = currentPage;
    if (currentPage === 0) nextPage = totalPages - 1;
    else nextPage = currentPage - 1;
    paginate(nextPage);
  };

  const slideRight = () => {
    let nextPage = currentPage;
    if (currentPage === totalPages - 1) nextPage = 0;
    else nextPage = currentPage + 1;
    paginate(nextPage);
  };

  return (
    <div className="navigation-buttons">
      <button className="navigation-buttons__left" onClick={slideLeft}>
        <ChevronLeft className="navigation-buttons__icon" />
      </button>
      <button className="navigation-buttons__right" onClick={slideRight}>
        <ChevronRight className="navigation-buttons__icon" />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  paginate: PropTypes.func,
  totalPages: PropTypes.number,
};

export default Pagination;
