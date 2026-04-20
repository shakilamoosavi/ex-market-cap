export type ColumnFormat = 'date' | 'dateTime' | 'time' | 'money' | 'text' | 'number' | 'boolean' | 'button' | 'percent';

export interface ColumnDef {
  key: string;
  label: string;
  sortable?: boolean;
  decimalPlace?: number | null;
  format?: ColumnFormat;
  // فقط وقتی format === 'button'
  buttonLabel?: string;
  buttonType?: 'submit' | 'cancel' | 'info' | 'link';
  linkUrl?: string;
  dataFunction?: (item: any) => string | number;
}

export interface ButtonClickEvent {
  rowIndex: number;
  columnKey: string;
  buttonLabel: string;
  row: Record<string, any>;
}

export interface ApiResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  key: string | null;
  direction: SortDirection;
}

export interface DataGridProps<T = any> {
  columnList: ColumnDef[];
  dataList?: T[];
  api?: (params: {
    page: number;
    pageSize: number;
    sortKey?: string;
    sortDir?: string;
  }) => Promise<ApiResponse<T>>;
  isFa?: boolean;
  pageSize?: number;
  onButtonClick?: (event: ButtonClickEvent) => void;
}
