import useSWR from 'swr';
import { useMemo } from 'react';

/** Utility **/
import { fetcher } from 'utils/axios';

/** Types **/
import { SortDirection } from '@mui/material';
import { FundsCardData } from 'types/funds';

const endpoints: any = {
  key: 'funds',
  fund_campaigns: (fundId: any) => `${endpoints.key}/${fundId}/campaigns`
};

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
      created_at: item.created_at ?? undefined,
      updated_at: item.updated_at ?? undefined,
      total: item.total ?? undefined,
      link: `/funds/${item.id}`
    }));
  }, [data]);

  return {
    fundsData: memoizedValue,
    totalFunds: data?.data?.funds_count || 0,
    totalProjects: data?.data?.items_count || 0,
    fundsLoading: isLoading,
    error,
    mutate
  };
}

export function useCampaignsPerFundData(fundId: any, sortField?: string, sortDirection: SortDirection = 'asc') {
  const params = {
    ...(sortField && { order_by: sortField }),
    order_dir: sortDirection
  };

  const { data, isLoading, error, mutate } = useSWR([endpoints.fund_campaigns(fundId), { params }], fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: FundsCardData[] = useMemo(() => {
    const campaignsData = data?.data?.items || [];

    if (!Array.isArray(campaignsData)) {
      return [];
    }

    return campaignsData.map((campaign: any) => ({
      id: campaign.id,
      name: campaign.name,
      created_at: campaign.created_at,
      updated_at: campaign.updated_at,
      total: campaign.total || 0,
      link: `/campaigns/${campaign.id}`
    }));
  }, [data]);

  return {
    fundData: data?.data.fund || null,
    campaignsData: memoizedValue,
    totalCampaigns: data?.data?.count || memoizedValue.length,
    totalProjects: data?.data?.projects_count || 0,
    isLoading,
    error,
    mutate
  };
}
