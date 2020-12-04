import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";
import { ReactComponent as ChevronRight } from "assets/icons/chevron-right.svg";
import Button from "components/button/Button";

import "./pagination.scss";

export default function Pagination({ page, setPage, pageCount }) {
  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleFirstPage = () => {
    setPage(0);
  };

  const handleLastPage = () => {
    setPage(pageCount);
  };

  const handleSpecific = () => {
    setPage(page);
  };

  const renderButtonNext =
    page === pageCount ? null : (
      <Button handleClick={handleNext} pagination>
        <ChevronRight className="reservations-pagination__chevron" />
      </Button>
    );

  const renderButtonPrev =
    page === 0 ? null : (
      <Button handleClick={handlePrev} pagination>
        <ChevronLeft className="reservations-pagination__chevron" />
      </Button>
    );

  const renderFirstPage =
    page === 0 ? null : (
      <Button handleClick={handleFirstPage} pagination>
        {1}
      </Button>
    );

  const renderPlaceholder =
    page > 0 && page < pageCount ? (
      <Button pagination>
        <span className="reservations-pagination__placeholder">...</span>
      </Button>
    ) : null;

  return (
    <div className="reservations-pagination">
      {renderButtonPrev}
      {renderFirstPage}
      {page === 0 ? null : (
        <Button handleClick={handleSpecific} pagination>
          {page}
        </Button>
      )}
      {renderPlaceholder}
      <Button handleClick={handleLastPage} pagination>
        <span>{pageCount}</span>
      </Button>
      {renderButtonNext}
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  pageCount: PropTypes.number,
};
