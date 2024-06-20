import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
const Paginition = ({ handlePageChange, currentPage, totalPages, type }) => {
  return (
    <Pagination
      className="flex items-center justify-center text-white"
      color="primary"
      shape="rounded"
      onChange={handlePageChange}
      page={currentPage}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          className={`text-white dark:text-white font-sansII ${
            item.type === "previous" || item.type === "next"
              ? "pagination-icon-bg"
              : ""
          }`}
          to={`${type}?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};
Pagination.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
export default Paginition;
