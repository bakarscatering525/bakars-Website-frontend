import React from 'react';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
  showSummary?: boolean;
}

const getPageNumbers = (currentPage: number, totalPages: number): number[] => {
  const maxButtons = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxButtons - 1);

  // Adjust start if we are close to the end
  start = Math.max(1, end - maxButtons + 1);

  const pages: number[] = [];
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }
  return pages;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  className,
  showSummary = false,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const firstItemIndex = (currentPage - 1) * pageSize + 1;
  const lastItemIndex = Math.min(currentPage * pageSize, totalItems);

  const changePage = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  const renderEllipsisBefore = pageNumbers[0] > 1;
  const renderEllipsisAfter = pageNumbers[pageNumbers.length - 1] < totalPages;

  return (
    <div
      className={clsx(
        'flex flex-col gap-3 items-center justify-between md:flex-row',
        className,
      )}
    >
      {showSummary && (
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{firstItemIndex}</span> to{' '}
          <span className="font-semibold">{lastItemIndex}</span> of{' '}
          <span className="font-semibold">{totalItems}</span> items
        </div>
      )}

      <nav className="flex items-center space-x-1" aria-label="Pagination">
        <button
          type="button"
          className={clsx(
            'px-3 py-1.5 text-sm rounded-md border transition-colors',
            isFirstPage
              ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50'
              : 'border-gray-200 text-gray-700 hover:bg-primary hover:text-white',
          )}
          onClick={() => changePage(currentPage - 1)}
          disabled={isFirstPage}
        >
          Prev
        </button>

        {renderEllipsisBefore && (
          <>
            <button
              type="button"
              className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-colors"
              onClick={() => changePage(1)}
            >
              1
            </button>
            <span className="px-2 text-gray-400">…</span>
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            className={clsx(
              'px-3 py-1.5 text-sm rounded-md border transition-colors',
              page === currentPage
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 text-gray-700 hover:bg-primary hover:text-white',
            )}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}

        {renderEllipsisAfter && (
          <>
            <span className="px-2 text-gray-400">…</span>
            <button
              type="button"
              className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-colors"
              onClick={() => changePage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          className={clsx(
            'px-3 py-1.5 text-sm rounded-md border transition-colors',
            isLastPage
              ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50'
              : 'border-gray-200 text-gray-700 hover:bg-primary hover:text-white',
          )}
          onClick={() => changePage(currentPage + 1)}
          disabled={isLastPage}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
