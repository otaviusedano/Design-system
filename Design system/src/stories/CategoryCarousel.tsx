import React, { useState, useRef, useEffect } from 'react';

import './category-carousel.css';

export interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface CategoryCarouselProps {
  categories: CategoryItem[];
  selectedId?: string;
  onSelect?: (categoryId: string) => void;
  showNavigation?: boolean;
}

export const CategoryCarousel = ({
  categories,
  selectedId,
  onSelect,
  showNavigation = true,
}: CategoryCarouselProps) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
    container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  const handleSelect = (categoryId: string) => {
    onSelect?.(categoryId);
  };

  return (
    <div className="storybook-category-carousel">
      {showNavigation && (
        <button
          className={[
            'storybook-category-carousel__nav',
            'storybook-category-carousel__nav--left',
            !canScrollLeft ? 'storybook-category-carousel__nav--disabled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Anterior"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15L7 10L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <div
        className="storybook-category-carousel__container"
        ref={scrollContainerRef}
      >
        <div className="storybook-category-carousel__content">
          {categories.map((category) => {
            const isSelected = selectedId === category.id;
            return (
              <button
                key={category.id}
                className={[
                  'storybook-category-carousel__item',
                  isSelected ? 'storybook-category-carousel__item--selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleSelect(category.id)}
                type="button"
              >
                <div className="storybook-category-carousel__icon">
                  {category.icon}
                </div>
                <span className="storybook-category-carousel__label">
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {showNavigation && (
        <button
          className={[
            'storybook-category-carousel__nav',
            'storybook-category-carousel__nav--right',
            !canScrollRight ? 'storybook-category-carousel__nav--disabled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Próximo"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 5L13 10L8 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
