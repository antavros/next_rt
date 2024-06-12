'use client';

import React, { useState, useEffect } from 'react';
import { API_URL_SEARCH, getData } from '@/shared/api/api';
import { TitleTable } from "@/entities/Title/Table";
import { Preloader } from '@/features/PreLoader';
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
  const [details, setDetails] = useState<any>(null);
  const [page, setPage] = useState(pagination.page);

  useEffect(() => {
    const fetchDetails = async () => {
      const searchValue = ''; // Set the search value according to your logic
      const data = await getData({ url: `${API_URL_SEARCH}${searchValue}&page=${page}` });
      setDetails(data);
    };
    fetchDetails();
  }, [page]);

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
      setPage(pageNum);
    }
  };

  const pageNumbers = getPageNumbers();

  if (!details) return <Preloader />;

  return (
    <>
      <TitleTable details={details.data} />
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Назад
        </button>
        {pageNumbers.map((pageNum, index) =>
          typeof pageNum === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(pageNum)}
              className={page === pageNum ? 'active' : ''}
            >
              {pageNum}
            </button>
          ) : (
            <span key={index} className="ellipsis">
              {pageNum}
            </span>
          )
        )}
        <button onClick={() => handlePageChange(page + 1)} disabled={page === pagination.pages}>
          Вперед
        </button>
      </div>
    </>
  );
};
