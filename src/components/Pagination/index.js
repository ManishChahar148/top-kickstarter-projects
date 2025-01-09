import React from 'react';
import './style.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationRange = () => {
    const range = [];
    const visiblePages = 2; // Number of pages to show before and after the current page

    if (totalPages <= 7) {
      // Show all pages if total pages <= 7
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Show dynamic range
      const startPages = [1, 2];
      const endPages = [totalPages - 1, totalPages];

      const middlePages = [];
      const start = Math.max(3, currentPage - visiblePages);
      const end = Math.min(totalPages - 2, currentPage + visiblePages);

      for (let i = start; i <= end; i++) {
        middlePages.push(i);
      }

      // Add start pages
      range.push(...startPages);

      // Add ellipsis if there is a gap between start and middle pages
      if (middlePages.length && middlePages[0] > startPages[startPages.length - 1] + 1) {
        range.push('...');
      }

      // Add middle pages
      range.push(...middlePages);

      // Add ellipsis if there is a gap between middle and end pages
      if (middlePages.length && middlePages[middlePages.length - 1] < endPages[0] - 1) {
        range.push('...');
      }

      // Add end pages
      range.push(...endPages);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="pagination-container">
      {/* Previous Button */}
      <button
        className="pagination-button"
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {paginationRange.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`pagination-button ${
              currentPage === page ? 'active' : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        className="pagination-button"
        onClick={() => {
          if (currentPage < totalPages) onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
