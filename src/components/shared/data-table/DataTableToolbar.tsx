"use client";

import React, { useState } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { NativeSelect } from "@/components/ui/native-select";
import { DataTableFilterConfig } from "./types";
import { cn } from "@/lib/utils";

interface DataTableToolbarProps<TData> {
  searchable?: boolean;
  searchPlaceholder?: string;
  searchButtonText?: string;
  onSearchCommit: (query: string) => void;
  onSearchClear: () => void;
  filters?: DataTableFilterConfig<TData>[];
  activeFilters: Record<string, string>;
  onFilterChange: (filterId: string, value: string) => void;
  actions?: React.ReactNode;
  className?: string;
}

export function DataTableToolbar<TData>({
  searchable = false,
  searchPlaceholder = "Cari data...",
  searchButtonText = "Cari",
  onSearchCommit,
  onSearchClear,
  filters,
  activeFilters,
  onFilterChange,
  actions,
  className,
}: DataTableToolbarProps<TData>) {
  // Local draft state: typing here does NOT trigger search or table filtering!
  const [draftSearch, setDraftSearch] = useState("");

  const handleSearch = (val: string) => {
    onSearchCommit(val);
  };

  const handleClear = () => {
    setDraftSearch("");
    onSearchClear();
  };

  const hasSearch = searchable;
  const hasFilters = filters && filters.length > 0;
  const hasActions = Boolean(actions);

  if (!hasSearch && !hasFilters && !hasActions) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
        className,
      )}
    >
      {/* Left controls: Search Input & Category Filters */}
      <div className="flex flex-1 flex-wrap items-center gap-2.5 max-w-2xl">
        {hasSearch && (
          <div className="w-full sm:w-auto sm:min-w-[280px] max-w-md">
            <SearchInput
              value={draftSearch}
              onChange={setDraftSearch}
              onSearch={handleSearch}
              onClear={handleClear}
              placeholder={searchPlaceholder}
              buttonText={searchButtonText}
              hideSubmitButton={false}
            />
          </div>
        )}

        {hasFilters &&
          filters.map((filter) => (
            <div key={filter.id} className="w-full sm:w-auto">
              <NativeSelect
                variant="rounded"
                value={activeFilters[filter.id] ?? filter.defaultValue ?? "ALL"}
                onChange={(e) => onFilterChange(filter.id, e.target.value)}
                className="font-mono text-xs font-semibold h-9"
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </NativeSelect>
            </div>
          ))}
      </div>

      {/* Right controls: Custom Actions (Refresh, Add, Export, etc.) */}
      {hasActions && (
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
