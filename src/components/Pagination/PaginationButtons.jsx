import React from "react";
import PropTypes from "prop-types";

import "./paginationButtons.scss";
import { ReactComponent as ChevronRight } from "assets/icons/chevron-right.svg";
import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";

const PaginationButtons = ({
  slideLeft,
  slideRight,
  formatAriaRight,
  formatAriaLeft,
}) => {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="navigation-buttons"
    >
      <button
        className="navigation-buttons__left"
        onClick={slideLeft}
        aria-label={formatAriaLeft()}
      >
        <ChevronLeft className="navigation-buttons__icon" />
      </button>
      <button
        className="navigation-buttons__right"
        onClick={slideRight}
        aria-label={formatAriaRight()}
      >
        <ChevronRight className="navigation-buttons__icon" />
      </button>
    </nav>
  );
};

PaginationButtons.propTypes = {
  slideLeft: PropTypes.func,
  slideRight: PropTypes.func,
  formatAriaLeft: PropTypes.func,
  formatAriaRight: PropTypes.func,
};

export default PaginationButtons;
