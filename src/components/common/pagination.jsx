import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = itemsCount / pageSize;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul
        className="Pagination"
        style={{
          listStyleType: "none",
          padding: "0px",
        }}
      >
        {pages.map((page) => (
          <li
            style={{ display: "inline-block" }}
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              style={{ border: "none" }}
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
