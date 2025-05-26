"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import "./style.css";

interface PaginationProps {
  pagination: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
  mode?: "classic" | "infinite-scroll" | "load-more";
  onLoadMore?: (nextPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  mode = "classic",
  onLoadMore,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(pagination.page);

  useEffect(() => {
    setCurrentPage(pagination.page);
  }, [pagination.page]);

  useEffect(() => {
    if (mode === "infinite-scroll") {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < pagination.pages) {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          onLoadMore?.(nextPage);
        }
      });

      const sentinel = document.querySelector("#scroll-sentinel");
      if (sentinel) observer.observe(sentinel);

      return () => observer.disconnect();
    }
  }, [currentPage, pagination.pages, mode, onLoadMore]);

  const handlePageChange = (pageNum: number) => {
    if (mode === "classic") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", pageNum.toString());
      router.push(`?${params.toString()}`);
    } else if (mode === "load-more") {
      setCurrentPage(pageNum);
      onLoadMore?.(pageNum);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= pagination.pages) {
      setCurrentPage(nextPage);
      onLoadMore?.(nextPage);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(pagination.pages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < pagination.pages) {
      if (endPage < pagination.pages - 1) pageNumbers.push("...");
      pageNumbers.push(pagination.pages);
    }

    return pageNumbers;
  };

  if (!pagination || pagination.pages <= 1) return null;

  // --- Classic Pagination ---
  if (mode === "classic") {
    const pageNumbers = getPageNumbers();
    return (
      <div className="pagination">
        <button
          className="pagNavButton"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IconChevronLeft stroke={2} />
        </button>

        {pageNumbers.map((pageNum, index) =>
          typeof pageNum === "number" ? (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={currentPage === pageNum ? "active" : ""}
            >
              <h6>{pageNum}</h6>
            </button>
          ) : (
            <h6 key={`ellipsis-${index}`} className="ellipsis">
              {pageNum}
            </h6>
          )
        )}

        <button
          className="pagNavButton"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.pages}
        >
          <IconChevronRight stroke={2} />
        </button>
      </div>
    );
  }

  // --- Load More Button ---
  if (mode === "load-more") {
    return currentPage < pagination.pages ? (
      <div className="pagination">
        <button onClick={handleLoadMore} className="load-more-button">
          Показать ещё
        </button>
      </div>
    ) : null;
  }

  // --- Infinite Scroll ---
  if (mode === "infinite-scroll") {
    return currentPage < pagination.pages ? (
      <div id="scroll-sentinel" style={{ height: "1px" }} />
    ) : null;
  }

  return null;
};
