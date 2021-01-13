import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as ChevronLeft } from "assets/icons/chev-left.svg";
import { ReactComponent as ChevronRight } from "assets/icons/chev-right.svg";
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
      <Button
        handleClick={handlePrev}
        ariaLabelText={"previous page"}
        pagination
      >
        <ChevronLeft className="chevron-left" />
      </Button>
    );

  const renderFirstPage =
    page > 1 || page < pageCount ? (
      <Button
        handleClick={handleFirstPage}
        ariaLabelText={"first page"}
        pagination
        isActive={page === 0 && true}
      >
        <span className="reservations-pagination__page-number">{1}</span>
      </Button>
    ) : null;

  const renderCurrentPage =
    page === 0 || page === pageCount ? null : (
      <Button
        handleClick={handleCurrentPage}
        ariaLabelText={`current page ${page + 1}`}
        pagination
        isActive
      >
        <span className="reservations-pagination__page-number">{page + 1}</span>
      </Button>
    );

  const renderPlaceholder =
    pageCount === 0 ? null : (
      <Button pagination isStatic>
        <span className="reservations-pagination__placeholder">...</span>
      </Button>
    );

  const renderLastPage =
    pageCount === 0 ? null : (
      <Button
        handleClick={handleLastPage}
        ariaLabelText={`last page ${pageCount + 1}`}
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
      <Button handleClick={handleNext} ariaLabelText={"next page"} pagination>
        <ChevronRight className="chevron-right" />
      </Button>
    );
  return (
    <nav className="reservations-pagination">
      {renderButtonPrev}
      {renderFirstPage}
      {page > 1 && page !== pageCount ? renderPlaceholder : null}
      {renderCurrentPage}
      {pageCount - 1 === page ? null : renderPlaceholder}
      {renderLastPage}
      {renderButtonNext}
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  pageCount: PropTypes.number,
};
