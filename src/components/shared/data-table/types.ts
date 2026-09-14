import React from "react";
import { LucideIcon } from "lucide-react";

export interface ColumnDef<TData> {
  id: string;
  header: string | React.ReactNode;
  cell: (item: TData, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "left" | "center" | "right";
}

export interface DataTableFilterOption {
  label: string;
  value: string;
}

export interface DataTableFilterConfig<TData> {
  id: string;
  label?: string;
  options: DataTableFilterOption[];
  filterFn: (item: TData, value: string) => boolean;
  defaultValue?: string;
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  keyExtractor?: (item: TData, index: number) => string | number;

  // Status State
  isLoading?: boolean;
  loadingRowsCount?: number;

  // Click-to-Search Configuration
  searchable?: boolean;
  searchPlaceholder?: string;
  searchButtonText?: string;
  searchAccessor?: (item: TData) => (string | number | null | undefined)[];

  // Category Dropdown Filters
  filters?: DataTableFilterConfig<TData>[];

  // Pagination Configuration
  paginated?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  entityName?: string;

  // Custom Toolbar Actions (Right Slot: Add, Refresh, Export, etc.)
  actions?: React.ReactNode;

  // Empty State Customization
  emptyIcon?: LucideIcon | React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;

  // Container styling
  className?: string;
  tableClassName?: string;
}
