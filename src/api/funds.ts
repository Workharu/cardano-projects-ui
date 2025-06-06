import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from 'utils/axios';
import { FundsCardData } from 'types/funds';

// API endpoint
const endpoints = {
  key: 'funds'
};

type SortDirection = 'asc' | 'desc';

export function useFundsData(sortField?: string, sortDirection: SortDirection = 'asc') {
  const params = {
    ...(sortField && { order_by: sortField }),
    order_dir: sortDirection
  };

  const { data, isLoading, error, mutate } = useSWR([endpoints.key, { params }], fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: FundsCardData[] = useMemo(() => {
    const fundsData = data?.data?.items || [];

    if (!Array.isArray(fundsData)) {
      return [];
    }

    return fundsData.map((item: any) => ({
      id: item.id,
      name: item.name,
      created_at: item.created_at,
      updated_at: item.updated_at,
      total: item.total,
      link: `/funds/${item.id}`
    }));
  }, [data]);

  return {
    fundsData: memoizedValue,
    totalFunds: data?.data?.funds_count || 0,
    totalIdeas: data?.data?.items_count || 0,
    homeLoading: isLoading,
    error,
    mutate
  };
}
