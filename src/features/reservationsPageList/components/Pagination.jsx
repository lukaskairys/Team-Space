import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";
import { ReactComponent as ChevronRight } from "assets/icons/chevron-right.svg";
import Button from "components/button/Button";

import "./pagination.scss";

export default function Pagination({ page, setPage, pageCount }) {
  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleFirstPage = () => {
    setPage(0);
  };

  const handleCurrentPage = () => {
    setPage(page);
  };

  const handleLastPage = () => {
    setPage(pageCount);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const renderButtonPrev =
    page === 0 ? null : (
      <Button handleClick={handlePrev} pagination>
        <ChevronLeft className="reservations-pagination__chevron" />
      </Button>
    );

  const renderFirstPage =
    page > 1 || page < pageCount ? (
      <Button
        handleClick={handleFirstPage}
        pagination
        isActive={page === 0 && true}
      >
        <span className="reservations-pagination__page-number">{1}</span>
      </Button>
    ) : null;

  const renderCurrentPage =
    page === 0 || page === pageCount ? null : (
      <Button handleClick={handleCurrentPage} pagination isActive>
        <span className="reservations-pagination__page-number">{page + 1}</span>
      </Button>
    );

  const renderPlaceholder = (
    <Button pagination isStatic>
      <span className="reservations-pagination__placeholder">...</span>
    </Button>
  );

  const renderLastPage = (
    <Button
      handleClick={handleLastPage}
      pagination
      isActive={page === pageCount && true}
    >
      <span className="reservations-pagination__page-number">
        {pageCount + 1}
      </span>
    </Button>
  );

  const renderButtonNext =
    page === pageCount ? null : (
      <Button handleClick={handleNext} pagination>
        <ChevronRight className="reservations-pagination__chevron" />
      </Button>
    );

  return (
    <div className="reservations-pagination">
      {renderButtonPrev}
      {renderFirstPage}
      {renderCurrentPage}
      {renderPlaceholder}
      {renderLastPage}
      {renderButtonNext}
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  pageCount: PropTypes.number,
};
