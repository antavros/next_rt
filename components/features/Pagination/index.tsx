'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';

import "./style.css";

interface PaginationProps {
  pagination: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
}

export const Pagination: React.FC<PaginationProps> = ({ pagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Если нет параметров пагинации, не показываем компонент
  if (!pagination) {
    return null;
  }

  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(pagination.pages, page + 2);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < pagination.pages) {
      if (endPage < pagination.pages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(pagination.pages);
    }

    return pageNumbers;
  };

  const handlePageChange = (pageNum: number) => {
    if (pageNum !== page && pageNum > 0 && pageNum <= pagination.pages) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('page', pageNum.toString());
      router.push(`${window.location.pathname}?${urlParams.toString()}`);
    }
  };

  const pageNumbers = getPageNumbers();
  return (
    <div className="pagination">
      <button className="pagNavButton" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        <IconChevronLeft stroke={2} />
      </button>
      {pageNumbers.map((pageNum, index) =>
        typeof pageNum === 'number' ? (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={page === pageNum ? 'active' : ''}
          >
            {pageNum}
          </button>
        ) : (
          <span key={`p${index}`} className="ellipsis">
            {pageNum}
          </span>
        )
      )}
      <button className="pagNavButton" onClick={() => handlePageChange(page + 1)} disabled={page === pagination.pages}>
        <IconChevronRight stroke={2} />
      </button>
    </div>
  );
};
