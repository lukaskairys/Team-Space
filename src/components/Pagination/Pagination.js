import React from "react";
import PropTypes from "prop-types";

import PaginationButtons from "components/PaginationButtons/PaginationButtons";

import "./Pagination.scss";

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

  return <PaginationButtons slideLeft={slideLeft} slideRight={slideRight} />;
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  paginate: PropTypes.func,
  totalPages: PropTypes.number,
};

export default Pagination;
