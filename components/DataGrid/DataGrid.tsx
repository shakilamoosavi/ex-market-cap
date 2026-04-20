'use client';

import React from 'react';
import { DataGridProps, ColumnDef, ButtonClickEvent } from './types';
import { formatValue } from './utils';
import { useDataGrid } from './useDataGrid';
import styles from './DataGrid.module.css';
import CustomButton from '../CustomButton';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// ===========================
// 🔥 جایگزین‌کننده لینک داینامیک
// ===========================
function resolveDynamicUrl(template: string, row: Record<string, any>) {
  return template.replace(/@@(.*?)@@/g, (_, key) => {
    return row[key] !== undefined ? String(row[key]) : "";
  });
}

// ===========================
// Sort Icon Component
// ===========================
function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  if (!direction) return <span className={styles.sortIcon}>⇅</span>;
  return (
    <span className={`${styles.sortIcon} ${styles.sortActive}`}>
      {direction === 'asc' ? '↑' : '↓'}
    </span>
  );
}

// ===========================
// Cell Renderer
// ===========================
function CellContent({
  row,
  col,
  rowIndex,
  isFa,
  onButtonClick,
}: {
  row: Record<string, any>;
  col: ColumnDef;
  rowIndex: number;
  isFa: boolean;
  onButtonClick?: (e: ButtonClickEvent) => void;
}) {

  // ====== اگر dataFunction تعریف شده، از اون استفاده کن ======
  if (col.dataFunction) {
    return <>{col.dataFunction(row)}</>;
  }

  // ====== BUTTON FORMAT ======
  if (col.format === 'button') {
    const label = col.buttonLabel ?? col.label;

    // 1) اگر لینک تعریف شده باشد → جایگزینی پارامترها
    const finalLink = col.linkUrl
      ? resolveDynamicUrl(col.linkUrl, row)
      : null;

    return (
      <CustomButton
        className={styles.actionBtn}
        btnType={col.buttonType ?? "info"}
        onClick={() =>
          onButtonClick?.({
            rowIndex,
            columnKey: col.key,
            buttonLabel: label,
            row,
          })
        }
      >
        {finalLink ? (
          <Link href={finalLink}>
            {label}
          </Link>
        ) : (
          label
        )}
      </CustomButton>
    );
  }

  // ====== DEFAULT FORMAT ======
  return <>{formatValue(row[col.key], col, isFa)}</>;
}

// ===========================
// Main DataGrid Component
// ===========================
export function DataGrid<T extends Record<string, any>>({
  columnList,
  dataList,
  api,
  isFa = false,
  pageSize = 10,
  onButtonClick,
}: DataGridProps<T>) {
  const t = useTranslations('components.dataGrid');
  const { rows, page, setPage, sort, handleSort, loading, totalPages } =
    useDataGrid({ dataList, api, pageSize });

  return (
    <div className={styles.wrapper}>
      {loading && <div className={styles.loadingBar} />}

      {/* Desktop Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columnList.map(col => (
                <th
                  key={col.key}
                  className={col.sortable ? styles.sortable : ''}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className={styles.thContent}>
                    {col.label}
                    {col.sortable && (
                      <SortIcon direction={sort.key === col.key ? sort.direction : null} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading ? (
              <tr>
                <td colSpan={columnList.length} className={styles.empty}>
                  {t('noData')}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  {columnList.map(col => (
                    <td key={col.key} data-label={col.label}>
                      <CellContent
                        row={row}
                        col={col}
                        rowIndex={(page - 1) * pageSize! + i}
                        isFa={isFa}
                        onButtonClick={onButtonClick}
                      />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className={styles.cardList}>
        {rows.map((row, i) => (
          <div key={i} className={styles.card}>
            {columnList.map(col => (
              <div key={col.key} className={styles.cardRow}>
                <span className={styles.cardLabel}>{col.label}</span>
                <span className={styles.cardValue}>
                  <CellContent
                    row={row}
                    col={col}
                    rowIndex={(page - 1) * pageSize! + i}
                    isFa={isFa}
                    onButtonClick={onButtonClick}
                  />
                </span>
              </div>
            ))}
          </div>
        ))}
        {rows.length === 0 && !loading && (
          <div className={styles.empty}>{t('noData')}</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={styles.pageBtn}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce<(number | '...')[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...');
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === '...' ? (
                <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ''}`}
                >
                  {p}
                </button>
              )
            )}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={styles.pageBtn}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
