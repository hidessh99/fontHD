"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { Search } from "lucide-react";
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTableRowSkeleton } from "./DataTableRowSkeleton";
import { DataTableProps } from "./types";
import { cn } from "@/lib/utils";

export function DataTable<TData>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  loadingRowsCount = 5,
  searchable = false,
  searchPlaceholder = "Cari data...",
  searchButtonText = "Cari",
  searchAccessor,
  filters,
  paginated = true,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  entityName = "data",
  actions,
  emptyIcon = Search,
  emptyTitle = "Tidak Ada Data Ditemukan",
  emptyDescription,
  emptyAction,
  className,
  tableClassName,
}: DataTableProps<TData>) {
  // Committed search query (only changes when user clicks "Cari" or presses Enter)
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);

  // Active category filter state
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (filters) {
      for (const f of filters) {
        if (f.defaultValue) {
          initial[f.id] = f.defaultValue;
        }
      }
    }
    return initial;
  });

  // Search commitment handlers
  const handleSearchCommit = useCallback((query: string) => {
    setAppliedSearch(query.trim());
    setCurrentPage(1); // Always reset to page 1 on new search
  }, []);

  const handleSearchClear = useCallback(() => {
    setAppliedSearch("");
    setCurrentPage(1);
  }, []);

  // Filter change handler
  const handleFilterChange = useCallback((filterId: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
    setCurrentPage(1); // Reset to page 1 on filter change
  }, []);

  // Filtered dataset (memoized to prevent layout thrashing and unnecessary re-evaluations)
  const filteredData = useMemo(() => {
    let result = data;

    // 1. Apply Click-to-Search filter
    if (appliedSearch && searchAccessor) {
      const q = appliedSearch.toLowerCase();
      result = result.filter((item) => {
        try {
          const values = searchAccessor(item);
          return values.some((val) => {
            if (val === null || val === undefined) return false;
            return String(val).toLowerCase().includes(q);
          });
        } catch {
          return false;
        }
      });
    }

    // 2. Apply category filters
    if (filters && filters.length > 0) {
      result = result.filter((item) => {
        return filters.every((filter) => {
          const selected = activeFilters[filter.id] ?? filter.defaultValue ?? "ALL";
          if (selected === "ALL") return true;
          try {
            return filter.filterFn(item, selected);
          } catch {
            return true;
          }
        });
      });
    }

    return result;
  }, [data, appliedSearch, searchAccessor, filters, activeFilters]);

  // Safe boundary pagination calculations
  const totalItems = filteredData.length;
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  // Paginated subset
  const paginatedData = useMemo(() => {
    if (!paginated) return filteredData;
    const start = (safeCurrentPage - 1) * safePageSize;
    return filteredData.slice(start, start + safePageSize);
  }, [filteredData, paginated, safeCurrentPage, safePageSize]);

  // Safe fallback description for empty state
  const resolvedEmptyDesc =
    emptyDescription ??
    (appliedSearch
      ? `Tidak ada ${entityName} yang sesuai dengan pencarian "${appliedSearch}".`
      : `Belum ada data ${entityName} yang tersedia.`);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search & Filter Toolbar */}
      <DataTableToolbar
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        searchButtonText={searchButtonText}
        onSearchCommit={handleSearchCommit}
        onSearchClear={handleSearchClear}
        filters={filters}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        actions={actions}
      />

      {/* Main Table Container */}
      <div
        className={cn(
          "w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl backdrop-blur-md",
          tableClassName,
        )}
      >
        <Table>
          <TableHeader className="border-b border-border/80 bg-muted/30">
            <TableRow className="hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(
                    "px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.headerClassName,
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-border/40 text-xs">
            {isLoading ? (
              <DataTableRowSkeleton columns={columns} rowCount={loadingRowsCount} />
            ) : paginatedData.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="px-5 py-8 text-center"
                >
                  <EmptyState
                    icon={emptyIcon}
                    title={emptyTitle}
                    description={resolvedEmptyDesc}
                    action={emptyAction}
                    className="border-none bg-transparent p-4"
                  />
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => {
                const globalIndex = (safeCurrentPage - 1) * safePageSize + index;
                const rowKey = keyExtractor
                  ? keyExtractor(item, globalIndex)
                  : (item as { id?: string | number }).id ?? globalIndex;

                return (
                  <TableRow
                    key={String(rowKey)}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={`${String(rowKey)}-${col.id}`}
                        className={cn(
                          "px-5 py-3.5 align-middle",
                          col.align === "center" && "text-center",
                          col.align === "right" && "text-right",
                          col.className,
                        )}
                      >
                        {col.cell(item, globalIndex)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Integrated Pagination Footer */}
        {paginated && !isLoading && totalItems > 0 && (
          <DataTablePagination
            page={safeCurrentPage}
            totalPages={totalPages}
            total={totalItems}
            pageSize={safePageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={pageSizeOptions}
            entityName={entityName}
          />
        )}
      </div>
    </div>
  );
}
