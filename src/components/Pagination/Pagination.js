import React from "react";
import PropTypes from "prop-types";

import PaginationButtons from "./PaginationButtons";

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

  const formatAriaRight = () => {
    if (currentPage + 1 === totalPages)
      return `Currently you are on the last page. Go to first page`;
    else if (currentPage - 1 === totalPages)
      return `Current page ${currentPage + 1}. Go to page 1`;
    else
      return `Current page ${currentPage + 1}. Go to page ${currentPage + 2}`;
  };

  const formatAriaLeft = () => {
    if (currentPage === 0)
      return `Currently you are on the first page. Go to last page`;
    else if (currentPage - 1 === 0)
      return `Current page ${currentPage + 1}. Go to first page`;
    else return `Current page ${currentPage + 1}. Go to page ${currentPage}`;
  };

  return (
    <PaginationButtons
      slideLeft={slideLeft}
      slideRight={slideRight}
      formatAriaRight={formatAriaRight}
      formatAriaLeft={formatAriaLeft}
    />
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  paginate: PropTypes.func,
  totalPages: PropTypes.number,
};

export default Pagination;
