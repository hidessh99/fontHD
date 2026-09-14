import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ColumnDef } from "./types";

interface DataTableRowSkeletonProps<TData> {
  columns: ColumnDef<TData>[];
  rowCount?: number;
}

export function DataTableRowSkeleton<TData>({
  columns,
  rowCount = 5,
}: DataTableRowSkeletonProps<TData>) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={`skeleton-row-${rowIndex}`} className="hover:bg-transparent">
          {columns.map((col, colIndex) => (
            <TableCell key={`skeleton-cell-${rowIndex}-${col.id || colIndex}`} className="px-5 py-4">
              <Skeleton className="h-4 w-full max-w-[140px] rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
