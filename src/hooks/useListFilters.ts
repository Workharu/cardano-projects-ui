// hook for filter management
import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface FilterOption {
  value: string;
  label: string;
}

export interface UseListFiltersConfig {
  defaultSort?: string;
  defaultSortDir?: 'asc' | 'desc';
  defaultLimit?: number;
  sortOptions: FilterOption[];
  statusOptions: FilterOption[];
}

export interface FilterState {
  status: string;
  ids: number[];
}

export function useListFilters(config: UseListFiltersConfig) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper functions
  const getNumber = (key: string, def: number) => {
    const v = Number(searchParams.get(key));
    return Number.isFinite(v) && v > 0 ? v : def;
  };

  const getString = (key: string, def: string) => searchParams.get(key) ?? def;

  const getNumberArray = (key: string): number[] => {
    const value = searchParams.get(key);
    if (!value) return [];
    return value
      .split(',')
      .map(Number)
      .filter((n) => Number.isFinite(n) && n > 0);
  };

  // Current filter values
  const page = getNumber('page', 1);
  const limit = getNumber('limit', config.defaultLimit || 10);
  const order_by = getString('order_by', config.defaultSort || 'id');
  const order_dir = getString('order_dir', config.defaultSortDir || 'desc') as 'asc' | 'desc';
  const search = getString('search', '');
  const status = getString('status', 'all');
  const ids = getNumberArray('ids');

  // Temporary filter state
  const [tempFilters, setTempFilters] = useState<FilterState>({
    status,
    ids
  });

  const updateQuery = useCallback(
    (patch: Record<string, any>, replace = false) => {
      const next = new URLSearchParams(searchParams);
      let resetPage = false;
      const fieldsThatResetPage = ['search', 'status', 'ids', 'order_by', 'order_dir'];

      for (const [k, v] of Object.entries(patch)) {
        if (fieldsThatResetPage.includes(k)) {
          const current = next.get(k);
          if (String(v ?? '') !== (current ?? '')) {
            resetPage = true;
          }
        }

        if (v === undefined || v === '' || v === 'all' || (Array.isArray(v) && v.length === 0)) {
          next.delete(k);
        } else if (Array.isArray(v)) {
          next.set(k, v.join(','));
        } else {
          next.set(k, String(v));
        }
      }

      if (resetPage) {
        next.set('page', '1');
      }

      setSearchParams(next, { replace });
    },
    [searchParams, setSearchParams]
  );

  const hasUnappliedChanges = tempFilters.status !== status || JSON.stringify(tempFilters.ids.sort()) !== JSON.stringify(ids.sort());

  const activeFiltersCount = [search && 'search', status !== 'all' && 'status', ids.length > 0 && 'ids'].filter(Boolean).length;

  return {
    // Current values
    page,
    limit,
    order_by,
    order_dir,
    search,
    status,
    ids,
    // Temp values
    tempFilters,
    setTempFilters,
    // Computed
    hasUnappliedChanges,
    activeFiltersCount,
    // Functions
    updateQuery,
    // Reset temp filters
    resetTempFilters: () => setTempFilters({ status, ids })
  };
}
