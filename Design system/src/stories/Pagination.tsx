import React, { useEffect, useRef, useState } from 'react';

import './pagination.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
  itemsPerPage: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
  maxVisible = 5,
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 50, 100],
}: PaginationProps) => {
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);
  const itemsPerPageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isItemsPerPageOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (itemsPerPageRef.current && !itemsPerPageRef.current.contains(event.target as Node)) {
        setIsItemsPerPageOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isItemsPerPageOpen]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    onItemsPerPageChange?.(value);
    setIsItemsPerPageOpen(false);
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      // Se há poucas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Sempre mostrar primeira página
      pages.push(1);
      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      
      // Sempre mostrar última página
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const PrevIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const NextIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="storybook-pagination__container">
      <div className="storybook-pagination__items-per-page" ref={itemsPerPageRef}>
        <span className="storybook-pagination__items-per-page-label">Itens por página:</span>
        <div
          className={[
            'storybook-pagination__items-per-page-select',
            isItemsPerPageOpen ? 'is-open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          role="button"
          tabIndex={0}
          onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setIsItemsPerPageOpen(!isItemsPerPageOpen);
            }
            if (event.key === 'Escape') {
              setIsItemsPerPageOpen(false);
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={isItemsPerPageOpen}
        >
          <span className="storybook-pagination__items-per-page-value">{itemsPerPage}</span>
          <span className="storybook-pagination__items-per-page-arrow">
            <ChevronDownIcon />
          </span>
          {isItemsPerPageOpen ? (
            <div className="storybook-pagination__items-per-page-dropdown" role="listbox">
              {itemsPerPageOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={[
                    'storybook-pagination__items-per-page-option',
                    option === itemsPerPage ? 'is-active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleItemsPerPageChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <nav className="storybook-pagination" aria-label="Pagination">
        <ul className="storybook-pagination__list">
        {/* Botão Anterior */}
        <li>
          <button
            type="button"
            className="storybook-pagination__button storybook-pagination__button--prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            <PrevIcon />
          </button>
        </li>

        {/* Primeira página (se showFirstLast) */}
        {showFirstLast && currentPage > 2 && totalPages > maxVisible && (
          <>
            <li>
              <button
                type="button"
                className="storybook-pagination__button"
                onClick={() => handlePageChange(1)}
                aria-label="Página 1"
              >
                1
              </button>
            </li>
            {currentPage > 3 && (
              <li>
                <span className="storybook-pagination__ellipsis">...</span>
              </li>
            )}
          </>
        )}

        {/* Páginas visíveis */}
        {visiblePages.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <li key={`ellipsis-${index}`}>
                <span className="storybook-pagination__ellipsis">...</span>
              </li>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <li key={pageNumber}>
              <button
                type="button"
                className={[
                  'storybook-pagination__button',
                  isActive ? 'storybook-pagination__button--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handlePageChange(pageNumber)}
                aria-label={`Página ${pageNumber}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* Última página (se showFirstLast) */}
        {showFirstLast && currentPage < totalPages - 1 && totalPages > maxVisible && (
          <>
            {currentPage < totalPages - 2 && (
              <li>
                <span className="storybook-pagination__ellipsis">...</span>
              </li>
            )}
            <li>
              <button
                type="button"
                className="storybook-pagination__button"
                onClick={() => handlePageChange(totalPages)}
                aria-label={`Página ${totalPages}`}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Botão Próximo */}
        <li>
          <button
            type="button"
            className="storybook-pagination__button storybook-pagination__button--next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Próxima página"
          >
            <NextIcon />
          </button>
        </li>
      </ul>
    </nav>
    </div>
  );
};
