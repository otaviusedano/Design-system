import React, { useState } from 'react';

import './table.css';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  sortable?: boolean;
}

export interface TableRow<T = any> {
  id: string;
  data: T;
  selected?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  rows: TableRow<T>[];
  caption?: string;
  showCheckbox?: boolean;
  showActions?: boolean;
  footer?: React.ReactNode;
  emptyMessage?: string;
  onRowClick?: (row: TableRow<T>, index: number) => void;
  onSelectAll?: (selected: boolean) => void;
  onSelectRow?: (rowId: string, selected: boolean) => void;
  onSort?: (columnKey: string, direction: 'asc' | 'desc') => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

const resolveSizeValue = (value?: number | string) => {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

export const Table = <T,>({
  columns,
  rows,
  caption,
  showCheckbox = false,
  showActions = false,
  footer,
  emptyMessage = 'Sem dados para exibir',
  onRowClick,
  onSelectAll,
  onSelectRow,
  onSort,
  sortColumn,
  sortDirection,
}: TableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const isEmpty = rows.length === 0;
  const allSelected = rows.length > 0 && selectedRows.size === rows.length;
  const someSelected = selectedRows.size > 0 && selectedRows.size < rows.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(rows.map((row) => row.id));
      setSelectedRows(allIds);
      onSelectAll?.(true);
    } else {
      setSelectedRows(new Set());
      onSelectAll?.(false);
    }
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);
    onSelectRow?.(rowId, checked);
  };

  const handleSort = (columnKey: string) => {
    if (!onSort) return;
    const newDirection =
      sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(columnKey, newDirection);
  };

  return (
    <div className="storybook-table-wrapper">
      <table className="storybook-table">
        {caption && (
          <caption className="storybook-table__caption">{caption}</caption>
        )}
        <thead className="storybook-table__head">
          <tr>
            {showCheckbox && (
              <th className="storybook-table__cell storybook-table__cell--header storybook-table__cell--checkbox">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="storybook-table__checkbox"
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={[
                  'storybook-table__cell',
                  'storybook-table__cell--header',
                  `storybook-table__cell--${column.align ?? 'left'}`,
                  column.sortable ? 'storybook-table__cell--sortable' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ width: resolveSizeValue(column.width) }}
                onClick={
                  column.sortable && onSort
                    ? () => handleSort(column.key)
                    : undefined
                }
              >
                <span className="storybook-table__header-content">
                  {column.header}
                  {column.sortable && sortColumn === column.key && (
                    <span className="storybook-table__sort-indicator">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </span>
              </th>
            ))}
            {showActions && (
              <th className="storybook-table__cell storybook-table__cell--header storybook-table__cell--actions">
                <span className="storybook-table__header-content">Ações</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="storybook-table__body">
          {isEmpty ? (
            <tr className="storybook-table__row storybook-table__row--empty">
              <td
                className="storybook-table__cell"
                colSpan={
                  columns.length + (showCheckbox ? 1 : 0) + (showActions ? 1 : 0)
                }
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => {
              const isSelected = selectedRows.has(row.id);
              return (
                <tr
                  key={row.id}
                  className={[
                    'storybook-table__row',
                    isSelected ? 'storybook-table__row--selected' : '',
                    row.highlighted ? 'storybook-table__row--highlighted' : '',
                    row.disabled ? 'storybook-table__row--disabled' : '',
                    onRowClick ? 'storybook-table__row--clickable' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={
                    row.disabled
                      ? undefined
                      : onRowClick
                        ? () => onRowClick(row, index)
                        : undefined
                  }
                >
                  {showCheckbox && (
                    <td className="storybook-table__cell storybook-table__cell--checkbox">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        disabled={row.disabled}
                        className="storybook-table__checkbox"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={`${row.id}-${column.key}`}
                      className={[
                        'storybook-table__cell',
                        `storybook-table__cell--${column.align ?? 'left'}`,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {column.accessor
                        ? column.accessor(row.data)
                        : (row.data as any)[column.key]}
                    </td>
                  ))}
                  {showActions && (
                    <td className="storybook-table__cell storybook-table__cell--actions">
                      <button
                        className="storybook-table__action-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle actions
                        }}
                        disabled={row.disabled}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="8" cy="3" r="1.5" fill="currentColor" />
                          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                          <circle cx="8" cy="13" r="1.5" fill="currentColor" />
                        </svg>
                      </button>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
        {footer && (
          <tfoot className="storybook-table__foot">
            <tr>
              <td
                className="storybook-table__cell storybook-table__cell--footer"
                colSpan={
                  columns.length + (showCheckbox ? 1 : 0) + (showActions ? 1 : 0)
                }
              >
                {footer}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};
