import React from "react";
import PropTypes from "prop-types";

import "./paginationButtons.scss";
import { ReactComponent as ChevronRight } from "assets/icons/chevron-right.svg";
import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";

const PaginationButtons = ({ slideLeft, slideRight }) => {
  return (
    <div className="navigation-buttons">
      <button
        className="navigation-buttons__left"
        onClick={slideLeft}
        aria-label={"Go to previous page"}
      >
        <ChevronLeft className="navigation-buttons__icon" />
      </button>
      <button
        className="navigation-buttons__right"
        onClick={slideRight}
        aria-label={"Go to next page"}
      >
        <ChevronRight className="navigation-buttons__icon" />
      </button>
    </div>
  );
};

PaginationButtons.propTypes = {
  slideLeft: PropTypes.func,
  slideRight: PropTypes.func,
};

export default PaginationButtons;
