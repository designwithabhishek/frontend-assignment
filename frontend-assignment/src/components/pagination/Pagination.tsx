import React from "react";
import "./pagination.css";
import classNames from "classnames";

type paginationProps = {
  total: number;
  selectedNumberOfRecordsPerPage: number;
  activePage: number;
  onPageSelect: (pageNumber: number) => void;
};

const Pagination: React.FC<paginationProps> = (props) => {
  const { total, selectedNumberOfRecordsPerPage, activePage, onPageSelect } = props;
  const totalPages = Math.ceil(total / selectedNumberOfRecordsPerPage);
  
  const pagesPerSet = 10;
  const startPage = Math.floor((activePage - 1) / pagesPerSet) * pagesPerSet + 1;
  const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const prevSet = activePage > 1 && startPage > 1;
  const nextSet = activePage < totalPages && endPage < totalPages;

  return (
    <div className="pagination-container">
      {prevSet && (
        <button onClick={() => onPageSelect(startPage - pagesPerSet)} className="btn">
          Previous
        </button>
      )}
      {pages.map((page) => {
        const buttonClasses = classNames({
          'btn': true,
          'active': activePage === page,
        });
        return (
          <button key={page} onClick={() => onPageSelect(page)} className={buttonClasses}>
            {page}
          </button>
        );
      })}
      {nextSet && (
        <button onClick={() => onPageSelect(endPage + 1)} className="btn">
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
