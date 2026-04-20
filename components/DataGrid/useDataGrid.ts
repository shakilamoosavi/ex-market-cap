import { useState, useEffect, useCallback } from 'react';
import { DataGridProps, SortState, ApiResponse } from './types';

export function useDataGrid<T>({
  dataList,
  api,
  pageSize = 10,
}: Pick<DataGridProps<T>, 'dataList' | 'api' | 'pageSize'>) {
  const [rows, setRows] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>({ key: null, direction: null });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!api) return;
    setLoading(true);
    try {
      const res: ApiResponse<T> = await api({
        page,
        pageSize: pageSize!,
        sortKey: sort.key ?? undefined,
        sortDir: sort.direction ?? undefined,
      });
      setRows(res.data);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  }, [api, page, pageSize, sort]);

  // اگه api داریم، fetch کن
  useEffect(() => {
    if (api) {
      fetchData();
    }
  }, [api, fetchData]);

  // اگه dataList داریم، pagination و sort رو client-side انجام بده
  useEffect(() => {
    if (!dataList) return;
    let sorted = [...dataList];
    if (sort.key && sort.direction) {
      sorted.sort((a: any, b: any) => {
        const av = a[sort.key!];
        const bv = b[sort.key!];
        if (av === bv) return 0;
        const cmp = av > bv ? 1 : -1;
        return sort.direction === 'asc' ? cmp : -cmp;
      });
    }
    setTotal(sorted.length);
    const start = (page - 1) * pageSize!;
    setRows(sorted.slice(start, start + pageSize!));
  }, [dataList, page, pageSize, sort]);

  const handleSort = (key: string) => {
    setSort(prev => {
      if (prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return { key: null, direction: null };
    });
    setPage(1);
  };

  const totalPages = Math.ceil(total / pageSize!);

  return { rows, total, page, setPage, sort, handleSort, loading, totalPages };
}
